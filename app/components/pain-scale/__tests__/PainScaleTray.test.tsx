import { fireEvent, render, screen } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PainScaleTray } from "@/components/pain-scale/PainScaleTray";
import { PAIN_SCALE_FACES } from "@/constants/painScaleFaces";

jest.mock("react-native-worklets", () =>
  jest.requireActual("react-native-worklets/src/mock"),
);
// The drag is not under test here: faces are tapped through Pressable, which
// does not go through gesture-handler.
jest.mock("react-native-gesture-handler", () => {
  const { View } = jest.requireActual("react-native");
  const chain: object = new Proxy({}, { get: () => () => chain });
  return {
    GestureHandlerRootView: View,
    GestureDetector: ({ children }: { children: React.ReactNode }) => children,
    Gesture: { Pan: () => chain },
  };
});
// Reanimated 4 does not load under jest-expo, not even through its own mock.
// The tray's reset logic lives in React state, so a stand-in that runs
// animations to their end at once is enough to test it.
jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native");
  const shared = <T,>(initial: T) => {
    let current = initial;
    return { get: () => current, set: (next: T) => (current = next) };
  };
  return {
    __esModule: true,
    default: {
      View,
      createAnimatedComponent: (component: unknown) => component,
    },
    Easing: { out: () => undefined, in: () => undefined, cubic: undefined },
    useSharedValue: (initial: unknown) =>
      jest.requireActual("react").useState(() => shared(initial))[0],
    useAnimatedStyle: () => ({}),
    useAnimatedReaction: () => {},
    withTiming: (
      toValue: unknown,
      _config?: unknown,
      callback?: (finished: boolean) => void,
    ) => {
      callback?.(true);
      return toValue;
    },
  };
});
jest.mock("expo-haptics", () => ({
  selectionAsync: jest.fn(),
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {},
  NotificationFeedbackType: {},
}));

const METRICS = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const lastFace = PAIN_SCALE_FACES[PAIN_SCALE_FACES.length - 1];

function tray(visible: boolean) {
  return (
    <SafeAreaProvider initialMetrics={METRICS}>
      <PainScaleTray visible={visible} onClose={jest.fn()} />
    </SafeAreaProvider>
  );
}

const sendButton = () => screen.getByLabelText("Enviar intensidade");
const slider = () => screen.getByLabelText("Escala de intensidade da dor");

async function chooseLastFace() {
  // The faces render only once the slider has measured its height.
  let row = slider().parent;
  while (row && !row.props.onLayout) row = row.parent;
  await fireEvent(row!, "layout", {
    nativeEvent: { layout: { height: 400 } },
  });
  await fireEvent.press(
    await screen.findByLabelText(`${lastFace.severity}. ${lastFace.label}`),
  );
}

describe("PainScaleTray", () => {
  it("turns Send on and announces the choice once a face is chosen", async () => {
    await render(tray(true));
    expect(sendButton().props.accessibilityState.disabled).toBe(true);

    await chooseLastFace();

    expect(sendButton().props.accessibilityState.disabled).toBe(false);
    expect(slider().props.accessibilityValue.now).toBe(100);
  });

  it("starts over when it opens again", async () => {
    const { rerender } = await render(tray(true));
    await chooseLastFace();

    await rerender(tray(false));
    await rerender(tray(true));

    expect(sendButton().props.accessibilityState.disabled).toBe(true);
    expect(slider().props.accessibilityValue.now).toBe(50);
  });
});
