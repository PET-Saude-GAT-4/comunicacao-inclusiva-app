import AsyncStorage from "@react-native-async-storage/async-storage";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { term } from "@test/fixtures";

import { boardTermsCacheKey } from "@/constants/cache";
import { PreferencesContext } from "@/contexts/PreferencesContext";
import ModuleVisualizationScreen from "@/screens/main-tabs/emergency/ModuleVisualizationScreen";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ navigate: mockNavigate, setOptions: jest.fn() }),
  useRoute: () => ({}),
}));

const board = { uuid: "module-1", title: "Dor" } as Board;
const fever = term("fever", "febre");

async function renderModule(onTermPress?: (term: Term) => void) {
  await AsyncStorage.setItem(
    boardTermsCacheKey(board.uuid),
    JSON.stringify([fever]),
  );
  await render(
    <PreferencesContext.Provider
      value={{
        displayMode: "signWriting",
        setDisplayMode: jest.fn(),
        toggleDisplayMode: jest.fn(),
      }}
    >
      <ModuleVisualizationScreen board={board} onTermPress={onTermPress} />
    </PreferencesContext.Provider>,
  );
}

beforeEach(async () => {
  await AsyncStorage.clear();
  mockNavigate.mockReset();
});

describe("ModuleVisualizationScreen", () => {
  it("hands the whole tapped term to onTermPress", async () => {
    const onTermPress = jest.fn();
    await renderModule(onTermPress);

    await fireEvent.press(await screen.findByText("FEBRE"));

    expect(onTermPress).toHaveBeenCalledWith(fever);
  });

  it("opens the urgency response with the whole term when opened as a module", async () => {
    await renderModule();

    await fireEvent.press(await screen.findByText("FEBRE"));

    expect(mockNavigate).toHaveBeenCalledWith("UrgencyResponse", {
      term: fever,
    });
  });
});
