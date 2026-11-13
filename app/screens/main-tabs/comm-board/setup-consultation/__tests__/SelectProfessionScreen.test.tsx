import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, screen } from "@testing-library/react-native";

import { PROFESSIONS_CACHE_KEY } from "@/constants/cache";
import { professionMock } from "@/mocks/professionMock";
import SelectProfessionScreen from "@/screens/main-tabs/comm-board/setup-consultation/SelectProfessionScreen";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({ goBack: jest.fn(), navigate: jest.fn() }),
}));

// The real provider renders nothing until the device reports its insets.
jest.mock(
  "react-native-safe-area-context",
  () => jest.requireActual("react-native-safe-area-context/jest/mock").default,
);

// The inset only matters under the hot-bar, which this test does not mount.
jest.mock("@/hooks/useHotBarInset", () => ({ useHotBarInset: () => 0 }));

beforeEach(() => AsyncStorage.clear());

describe("SelectProfessionScreen", () => {
  it("explains that no area is available when the API sent none", async () => {
    await AsyncStorage.setItem(PROFESSIONS_CACHE_KEY, "[]");

    await render(<SelectProfessionScreen />);

    expect(
      await screen.findByText("Nenhuma área disponível no momento."),
    ).toBeTruthy();
  });

  it("lists the areas without the empty message when there are some", async () => {
    await AsyncStorage.setItem(
      PROFESSIONS_CACHE_KEY,
      JSON.stringify(professionMock),
    );

    await render(<SelectProfessionScreen />);

    expect(await screen.findByText(professionMock[0].name)).toBeTruthy();
    expect(
      screen.queryByText("Nenhuma área disponível no momento."),
    ).toBeNull();
  });
});
