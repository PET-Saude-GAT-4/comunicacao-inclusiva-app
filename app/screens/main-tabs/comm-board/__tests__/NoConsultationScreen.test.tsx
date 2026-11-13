import { render, screen } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import NoConsultationScreen from "@/screens/main-tabs/comm-board/NoConsultationScreen";

const mockSetParams = jest.fn();
let mockParams: { showPhrasePrompt?: boolean } | undefined;

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: jest.fn(), setParams: mockSetParams }),
  useRoute: () => ({ params: mockParams }),
}));

const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <NoConsultationScreen />
    </SafeAreaProvider>,
  );

const PROMPT = "Inicie um atendimento para usar frases prontas.";

beforeEach(() => {
  mockSetParams.mockClear();
  mockParams = undefined;
});

describe("NoConsultationScreen", () => {
  it("prompts to start a consultation when sent from a ready-made phrase", async () => {
    mockParams = { showPhrasePrompt: true };

    await renderScreen();

    expect(screen.getByText(PROMPT)).toBeTruthy();
  });

  it("shows no prompt when opened directly", async () => {
    await renderScreen();

    expect(screen.queryByText(PROMPT)).toBeNull();
  });
});
