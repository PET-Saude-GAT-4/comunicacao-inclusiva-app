import { apiBoard, apiPhrase, apiTerm } from "@test/fixtures";
import { act, fireEvent, render, screen } from "@testing-library/react-native";

import { PreferencesContext } from "@/contexts/PreferencesContext";
import CommBoardScreen from "@/screens/main-tabs/comm-board/CommBoardScreen";
import { SyncService } from "@/services/syncService";
import { request } from "@/utils/apiUtils";

// Only the transport is replaced: the sync, services and adapters run for real,
// so the screen reads the cache the app would write. Routes not listed (the
// professions, emergency boards, triage) fail and leave their cache untouched.
jest.mock("@/utils/apiUtils", () => ({ request: jest.fn() }));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: jest.fn(), setParams: jest.fn() }),
  useRoute: () => ({ params: {} }),
}));

jest.mock("@/hooks/useSession", () => ({
  useSession: () => ({
    addInteraction: jest.fn(),
    currentSpeaker: "patient",
    isInConsultation: true,
    setCurrentSpeaker: jest.fn(),
  }),
}));

// The inset only matters under the hot-bar, which this test does not mount.
jest.mock("@/hooks/useHotBarInset", () => ({ useHotBarInset: () => 0 }));

// Reanimated cannot load under Jest, and these trays are not under test.
jest.mock("@/components/pain-scale/PainScaleTray", () => ({
  PainScaleTray: () => null,
}));
jest.mock("@/components/pain-scale/PainScaleTrigger", () => ({
  PainScaleTrigger: () => null,
}));
jest.mock("@/components/body-map/BodyMap", () => ({ BodyMap: () => null }));
jest.mock("@/components/AccessibilityMenu", () => ({
  AccessibilityMenu: () => null,
}));

jest.mock("expo-image", () => {
  const { View } = jest.requireActual("react-native");
  return { Image: (props: object) => <View {...props} /> };
});

// The suggested badge is an icon with no text of its own, so the icon is
// rendered as its name to make it findable.
jest.mock("@expo/vector-icons", () => {
  const { Text } = jest.requireActual("react-native");
  return {
    Ionicons: ({ name }: { name: string }) => <Text>{`icon:${name}`}</Text>,
  };
});

const API = "/public";
const mockedRequest = jest.mocked(request);

const symptoms = apiBoard({ uuid: "symptoms", title: "Sintomas Gerais" });
const body = apiBoard({ uuid: "body", title: "Partes do Corpo" });
const emotions = apiBoard({ uuid: "emotions", title: "Emoções" });

const head = apiTerm({ termUuid: "head", description: "Cabeça" });
const malaise = apiTerm({ termUuid: "malaise", description: "Mal-Estar" });

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
  await render(
    <PreferencesContext.Provider
      value={{
        displayMode: "pictogram",
        setDisplayMode: jest.fn(),
        toggleDisplayMode: jest.fn(),
      }}
    >
      <CommBoardScreen />
    </PreferencesContext.Provider>,
  );
  await flush();
}

async function tapTerm(label: string) {
  await fireEvent.press(screen.getByText(new RegExp(`^${label}$`, "i")));
  await flush();
}

type Node = { children?: (Node | string)[] | null } | string;

const textsIn = (node: Node): string[] =>
  typeof node === "string" ? [node] : (node.children ?? []).flatMap(textsIn);

// A carousel chip and its badge share a parent that holds nothing else, so the
// smallest subtree with the badge and one board title names the chip.
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
  (Array.isArray(tree) ? tree : [tree]).forEach((node) => node && visit(node));
  return found;
}

describe("CommBoardScreen suggestions", () => {
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
