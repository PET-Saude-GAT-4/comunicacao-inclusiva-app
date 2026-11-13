import { render, screen } from "@testing-library/react-native";
import { term } from "@test/fixtures";

import { DisplayMode, PreferencesContext } from "@/contexts/PreferencesContext";
import { UrgencyResponseScreen } from "@/screens/main-tabs/emergency/tabs/QuickEmergency/UrgencyResponseScreen";

const mockRouteParams: { params?: object } = {};

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    canGoBack: () => true,
    goBack: jest.fn(),
    navigate: jest.fn(),
  }),
  useRoute: () => mockRouteParams,
}));

// A host View stands in for expo-image so the test can read the source it got.
jest.mock("expo-image", () => {
  const { View } = jest.requireActual("react-native");
  return {
    Image: (props: object) => <View testID="symptom-image" {...props} />,
  };
});

// The inset only matters under the hot-bar, which this test does not mount.
jest.mock("@/hooks/useHotBarInset", () => ({ useHotBarInset: () => 0 }));

async function renderIn(displayMode: DisplayMode) {
  mockRouteParams.params = { term: term("fever", "febre") };
  await render(
    <PreferencesContext.Provider
      value={{
        displayMode,
        setDisplayMode: jest.fn(),
        toggleDisplayMode: jest.fn(),
      }}
    >
      <UrgencyResponseScreen />
    </PreferencesContext.Provider>,
  );
}

describe("UrgencyResponseScreen", () => {
  it("shows the symptom's SignWriting image in SignWriting mode", async () => {
    await renderIn("signWriting");

    expect(screen.getByTestId("symptom-image").props.source).toBe(
      "sw/fever.png",
    );
    expect(screen.getByText("FEBRE")).toBeTruthy();
  });

  it("shows the symptom's pictogram in pictogram mode", async () => {
    await renderIn("pictogram");

    expect(screen.getByTestId("symptom-image").props.source).toBe(
      "pic/fever.png",
    );
    expect(screen.getByText("FEBRE")).toBeTruthy();
  });
});
