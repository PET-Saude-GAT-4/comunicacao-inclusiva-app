import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiBoard, apiPhrase, apiTerm, phrase, term } from "@test/fixtures";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import {
  BOARDS_CACHE_KEY,
  boardTermsCacheKey,
  nextBoardsCacheKey,
  phraseNextBoardsCacheKey,
  PHRASES_CACHE_KEY,
} from "@/constants/cache";
import CommBoardScreen from "@/screens/main-tabs/comm-board/CommBoardScreen";
import { SyncService } from "@/services/syncService";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";
import { request } from "@/utils/apiUtils";

type Params = {
  mode?: "bodyMap";
  initialTerms?: Term[];
  triggerPhraseUuid?: string;
};

const mockSetParams = jest.fn();
let mockParams: Params | undefined;
let mockSpeaker: "patient" | "professional" = "professional";

// Only the transport is replaced, for the suites that sync: services and
// adapters run for real, so the screen reads the cache the app would write.
jest.mock("@/utils/apiUtils", () => ({ request: jest.fn() }));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: jest.fn(), setParams: mockSetParams }),
  useRoute: () => ({ params: mockParams }),
}));
jest.mock("@/hooks/useSession", () => ({
  useSession: () => ({
    addInteraction: jest.fn(),
    currentSpeaker: mockSpeaker,
    isInConsultation: true,
    setCurrentSpeaker: jest.fn(),
  }),
}));
jest.mock("@/hooks/usePreferences", () => ({
  usePreferences: () => ({ displayMode: "pictogram" }),
}));
jest.mock("@/hooks/useHotBarInset", () => ({ useHotBarInset: () => 0 }));
// The pain scale and the body map have their own tests or none to give here;
// what this file covers is how the screen reacts to its params and its data.
jest.mock("@/components/pain-scale/PainScaleTray", () => ({
  PainScaleTray: () => null,
}));
jest.mock("@/components/pain-scale/PainScaleTrigger", () => ({
  PainScaleTrigger: () => null,
}));
// Its pulse is an endless Animated.loop, which keeps Jest from exiting.
jest.mock("@/components/BoardSkeleton", () => ({ BoardSkeleton: () => null }));
jest.mock("@/components/AccessibilityMenu", () => ({
  AccessibilityMenu: () => null,
}));
jest.mock("@/components/body-map/BodyMap", () => ({
  BodyMap: () => {
    const { Text: MockText } = jest.requireActual("react-native");
    return <MockText>mapa corporal</MockText>;
  },
}));
// The suggested badge is an icon with no text of its own, so the icon is
// rendered as its name to make it findable.
jest.mock("@expo/vector-icons", () => {
  const { Text: MockText } = jest.requireActual("react-native");
  return {
    Ionicons: ({ name }: { name: string }) => (
      <MockText>{`icon:${name}`}</MockText>
    ),
  };
});

beforeEach(async () => {
  await AsyncStorage.clear();
  mockSetParams.mockClear();
  mockParams = undefined;
  mockSpeaker = "professional";
});

describe("CommBoardScreen", () => {
  const board = (uuid: string) => ({ uuid, title: uuid }) as Board;

  const first = board("primeira");
  const recommended = board("recomendada");
  const firstTerm = term("termo-da-primeira");
  const recommendedTerm = term("termo-da-recomendada");
  const readyMade = phrase("frase-pronta", ["termo-da-frase"]);

  const label = (t: Term) => t.description.toUpperCase();

  beforeEach(async () => {
    await AsyncStorage.multiSet([
      [BOARDS_CACHE_KEY, JSON.stringify([first, recommended])],
      [boardTermsCacheKey(first.uuid), JSON.stringify([firstTerm])],
      [boardTermsCacheKey(recommended.uuid), JSON.stringify([recommendedTerm])],
      [nextBoardsCacheKey(first.uuid), "[]"],
      [nextBoardsCacheKey(recommended.uuid), "[]"],
      [PHRASES_CACHE_KEY, JSON.stringify([readyMade])],
      [phraseNextBoardsCacheKey(readyMade.uuid), JSON.stringify([recommended])],
    ]);
  });

  it("opens the first board when nothing asks for another", async () => {
    await render(<CommBoardScreen />);

    expect(await screen.findByText(label(firstTerm))).toBeTruthy();
  });

  it("fills the visor from a ready-made phrase and opens the board it recommends", async () => {
    mockParams = {
      initialTerms: readyMade.terms,
      triggerPhraseUuid: readyMade.uuid,
    };

    await render(<CommBoardScreen />);

    expect(await screen.findByText(label(readyMade.terms[0]))).toBeTruthy();
    expect(await screen.findByText(label(recommendedTerm))).toBeTruthy();
    expect(screen.queryByText(label(firstTerm))).toBeNull();
    expect(mockSetParams).toHaveBeenCalledWith(
      expect.objectContaining({ initialTerms: undefined }),
    );
    expect(mockSetParams).toHaveBeenCalledWith(
      expect.objectContaining({ triggerPhraseUuid: undefined }),
    );
  });

  it("opens the body map when the patient is asked to point", async () => {
    mockSpeaker = "patient";
    mockParams = { mode: "bodyMap" };

    await render(<CommBoardScreen />);

    expect(await screen.findByText("mapa corporal")).toBeTruthy();
    expect(mockSetParams).toHaveBeenCalledWith(
      expect.objectContaining({ mode: undefined }),
    );
  });

  it("ignores the body map request while the professional speaks", async () => {
    mockParams = { mode: "bodyMap" };

    await render(<CommBoardScreen />);

    await waitFor(() =>
      expect(mockSetParams).toHaveBeenCalledWith(
        expect.objectContaining({ mode: undefined }),
      ),
    );
    expect(screen.queryByText("mapa corporal")).toBeNull();
  });
});

describe("CommBoardScreen suggestions", () => {
  const API = "/public";
  const mockedRequest = jest.mocked(request);

  const symptoms = apiBoard({ uuid: "symptoms", title: "Sintomas Gerais" });
  const body = apiBoard({ uuid: "body", title: "Partes do Corpo" });
  const emotions = apiBoard({ uuid: "emotions", title: "Emoções" });

  const head = apiTerm({ termUuid: "head", description: "Cabeça" });
  const malaise = apiTerm({ termUuid: "malaise", description: "Mal-Estar" });

  // Routes not listed (the professions, emergency boards, triage) fail and
  // leave their cache untouched.
  const routes: Record<string, unknown> = {
    // The first board opens by default.
    [`${API}/boards?type=common`]: { boards: [symptoms, body, emotions] },
    [`${API}/boards/symptoms/terms`]: { terms: [head, malaise] },
    [`${API}/boards/body/terms`]: { terms: [] },
    [`${API}/boards/emotions/terms`]: { terms: [] },
    [`${API}/boards/symptoms/next-boards`]: { boards: [body] },
    [`${API}/boards/body/next-boards`]: { boards: [] },
    [`${API}/boards/emotions/next-boards`]: { boards: [] },
    [`${API}/phrases`]: {
      phrases: [
        apiPhrase({ uuid: "head-only", terms: [head], listedInLibrary: false }),
        apiPhrase({ uuid: "malaise-only", terms: [malaise] }),
        apiPhrase({ uuid: "malaise-head", terms: [malaise, head] }),
      ],
    },
    // Names a board the API does not list, so the device never synced it.
    [`${API}/phrases/malaise-head/next-boards`]: {
      boards: [apiBoard({ uuid: "unsynced", title: "Fora da Lista" })],
    },
    // Recommends only the board it is composed on.
    [`${API}/phrases/head-only/next-boards`]: { boards: [symptoms] },
    [`${API}/phrases/malaise-only/next-boards`]: { boards: [emotions] },
  };

  beforeEach(async () => {
    mockedRequest.mockImplementation(async (url: string) => {
      const path = url.slice(url.indexOf("/public"));
      if (path in routes) return routes[path];
      throw new Error(`Request failed: 404 ${url}`);
    });
    await new SyncService().syncAll();
  });

  // The hooks chain several cache reads. A `waitFor` would pass on the state
  // before a read lands whenever that state already matches, so the screen is
  // let settle instead.
  async function flush() {
    for (let i = 0; i < 10; i++) {
      await act(() => new Promise((resolve) => setTimeout(resolve)));
    }
  }

  async function renderScreen() {
    await render(<CommBoardScreen />);
    await flush();
  }

  async function tapTerm(label: string) {
    await fireEvent.press(screen.getByText(new RegExp(`^${label}$`, "i")));
    await flush();
  }

  type Node = { children?: (Node | string)[] | null } | string;

  const textsIn = (node: Node): string[] =>
    typeof node === "string" ? [node] : (node.children ?? []).flatMap(textsIn);

  // A carousel chip and its badge share a parent that holds nothing else, so
  // the smallest subtree with the badge and one board title names the chip.
  function suggestedBoards(): string[] {
    const titles = [symptoms, body, emotions].map((b) => b.title.toUpperCase());
    const found: string[] = [];

    const visit = (node: Node): boolean => {
      if (typeof node === "string") return false;
      const inChild = (node.children ?? []).map(visit).some(Boolean);
      if (inChild) return true;

      const texts = textsIn(node);
      const named = texts.filter((text) => titles.includes(text));
      if (texts.includes("icon:arrow-forward") && named.length === 1) {
        found.push(named[0]);
        return true;
      }
      return false;
    };

    const tree = screen.toJSON();
    (Array.isArray(tree) ? tree : [tree]).forEach(
      (node) => node && visit(node),
    );
    return found;
  }

  it("suggests the open board's successors when the phrase only recommends that board", async () => {
    await renderScreen();
    expect(suggestedBoards()).toEqual(["PARTES DO CORPO"]);

    await tapTerm("Cabeça");

    expect(suggestedBoards()).toEqual(["PARTES DO CORPO"]);
  });

  it("suggests the open board's successors when the phrase only recommends a board the device lacks", async () => {
    await renderScreen();

    await tapTerm("Mal-Estar");
    await tapTerm("Cabeça");

    expect(suggestedBoards()).toEqual(["PARTES DO CORPO"]);
  });

  it("lets a phrase's recommendation outrank the open board's successors", async () => {
    await renderScreen();

    await tapTerm("Mal-Estar");

    expect(suggestedBoards()).toEqual(["EMOÇÕES"]);
  });
});
