import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, screen, waitFor } from "@testing-library/react-native";
import { phrase, term } from "@test/fixtures";

import {
  BOARDS_CACHE_KEY,
  boardTermsCacheKey,
  nextBoardsCacheKey,
  PHRASES_CACHE_KEY,
  phraseNextBoardsCacheKey,
} from "@/constants/cache";
import CommBoardScreen from "@/screens/main-tabs/comm-board/CommBoardScreen";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";

type Params = {
  mode?: "bodyMap";
  initialTerms?: Term[];
  triggerPhraseUuid?: string;
};

const mockSetParams = jest.fn();
let mockParams: Params | undefined;
let mockSpeaker: "patient" | "professional" = "professional";

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
// what this file covers is how the screen reacts to its params.
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

const board = (uuid: string) => ({ uuid, title: uuid }) as Board;

const first = board("primeira");
const recommended = board("recomendada");
const firstTerm = term("termo-da-primeira");
const recommendedTerm = term("termo-da-recomendada");
const readyMade = phrase("frase-pronta", ["termo-da-frase"]);

async function seedCache() {
  await AsyncStorage.multiSet([
    [BOARDS_CACHE_KEY, JSON.stringify([first, recommended])],
    [boardTermsCacheKey(first.uuid), JSON.stringify([firstTerm])],
    [boardTermsCacheKey(recommended.uuid), JSON.stringify([recommendedTerm])],
    [nextBoardsCacheKey(first.uuid), "[]"],
    [nextBoardsCacheKey(recommended.uuid), "[]"],
    [PHRASES_CACHE_KEY, JSON.stringify([readyMade])],
    [phraseNextBoardsCacheKey(readyMade.uuid), JSON.stringify([recommended])],
  ]);
}

const label = (t: Term) => t.description.toUpperCase();

beforeEach(async () => {
  await AsyncStorage.clear();
  await seedCache();
  mockSetParams.mockClear();
  mockParams = undefined;
  mockSpeaker = "professional";
});

describe("CommBoardScreen", () => {
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
