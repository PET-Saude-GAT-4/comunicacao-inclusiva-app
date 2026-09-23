import { COLORS, CONTAINERS } from "@/styles/themes";
import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AccessibilityActionEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { faceSizeFor, nearestIndexFor, valueToY, yToValue } from "./geometry";
import type { ScaleItem } from "./types";

export const TRACK_COLUMN_WIDTH = 72;

const TRACK_PILL_WIDTH = 14;
const TICK_SIZE = 6;
const THUMB_WIDTH = 34;
const THUMB_HEIGHT = 6;

/**
 * The faces card has a 1px border. In React Native, a child with
 * `position: absolute` starts counting from inside the border. The track column
 * has no border, so each face would end up 1px lower than its dot. We move the
 * faces layer up by 1px to fix this.
 */
const CARD_BORDER = 1;

/**
 * Distances used by the haptics, measured in dots (1.0 = the space between two
 * dots). The phone vibrates when the thumb gets closer than ENTER to a dot.
 * After that, the thumb must move further away than EXIT before the same dot
 * can vibrate again.
 */
const TICK_ENTER_BAND = 0.15;
const TICK_EXIT_BAND = 0.35;

interface Props {
  items: ScaleItem[];
  /** The current value. The tray owns it so it can read it when sending. */
  value: SharedValue<number>;
  disabled?: boolean;
  /** Called once, the first time the user touches the scale. */
  onInteract: () => void;
  /** Called when the value stops changing (finger released, or face tapped). */
  onSettle?: (value: number) => void;
  /**
   * The tray changes this number every time it resets `value` (when it opens).
   * We use it to update the copy of the value that the screen reader reads,
   * so it does not announce the value from the previous time.
   */
  resetToken?: number;
}

export function PainScaleSlider({
  items,
  value,
  disabled = false,
  onInteract,
  onSettle,
  resetToken = 0,
}: Props) {
  const count = items.length;
  const [height, setHeight] = useState(0);
  /**
   * A copy of the value kept in React state, updated only when the value stops
   * changing. It is used only to tell the screen reader the current value.
   * Copying it on every frame would slow the drag down.
   */
  const [settledValue, setSettledValue] = useState(value.value);

  /** True from the moment the finger touches the track. */
  const isDragging = useSharedValue(false);
  /**
   * True only while the finger is really moving. This is different from
   * isDragging, which is already true while the thumb animates to a tapped
   * point. Without this flag, tapping a far part of the track would vibrate
   * once for every dot the thumb passes on the way there.
   */
  const isTracking = useSharedValue(false);
  /** The last dot that vibrated. -1 means no dot is waiting to vibrate. */
  const lastTickIndex = useSharedValue(-1);
  /** Makes sure onInteract is called only once, not on every gesture. */
  const hasInteracted = useSharedValue(false);

  const faceSize = height > 0 ? faceSizeFor(height, count) : 0;

  useEffect(() => {
    setSettledValue(value.value);
  }, [resetToken, value]);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  const handleSettle = useCallback(
    (v: number) => {
      setSettledValue(v);
      onSettle?.(v);
    },
    [onSettle],
  );

  const markInteracted = useCallback(() => {
    onInteract();
  }, [onInteract]);

  const tickHaptic = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  // Vibrates when the thumb passes over a dot.
  //
  // Do not use nearestIndexFor here. That function changes its result in the
  // middle between two dots, so the phone would vibrate in the wrong place.
  // Instead we measure how far the thumb is from the closest dot. We multiply
  // the value by (count - 1) so the dots sit on whole numbers: 0, 1, 2, 3...
  useAnimatedReaction(
    () => value.value * (count - 1),
    (position) => {
      if (!isTracking.value) return;

      const nearest = Math.round(position);
      const distance = Math.abs(position - nearest);

      if (distance <= TICK_ENTER_BAND) {
        // The thumb is on a dot. We save which dot it was, so holding the
        // thumb still on the dot vibrates only one time.
        if (lastTickIndex.value !== nearest) {
          lastTickIndex.value = nearest;
          scheduleOnRN(tickHaptic);
        }
      } else if (distance >= TICK_EXIT_BAND) {
        // The thumb is far from any dot, so the next dot may vibrate again.
        // We use two different distances (ENTER and EXIT) on purpose: with only
        // one, a thumb stopped near that distance would vibrate many times.
        lastTickIndex.value = -1;
      }
    },
    [count],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        // The gesture starts as soon as the finger touches, without waiting for
        // movement. This way a simple tap on the track also moves the thumb,
        // using the same code as a drag. We do not need a separate Tap gesture.
        .minDistance(0)
        .enabled(!disabled && height > 0)
        .onBegin((e) => {
          isDragging.value = true;
          isTracking.value = false;
          const target = yToValue(e.y, height, count);
          // Save the dot closest to the touch point. Without this, the first
          // small finger movement would vibrate on the dot we just arrived at.
          lastTickIndex.value = Math.round(target * (count - 1));
          // A short animation, so the thumb looks like it moves to the touched
          // point instead of jumping there. When the finger moves, onUpdate
          // sets the value directly and this animation stops by itself.
          value.value = withTiming(target, { duration: 120 });
          if (!hasInteracted.value) {
            hasInteracted.value = true;
            scheduleOnRN(markInteracted);
          }
        })
        .onUpdate((e) => {
          // Only real finger movement turns the haptics on.
          isTracking.value = true;
          // We set the value directly, with no animation, so the thumb follows
          // the finger exactly. This also stops any animation still running
          // from onBegin or from a face tap.
          value.value = yToValue(e.y, height, count);
        })
        .onFinalize(() => {
          isDragging.value = false;
          isTracking.value = false;
          scheduleOnRN(handleSettle, value.value);
        }),
    [
      disabled,
      height,
      count,
      value,
      isDragging,
      isTracking,
      lastTickIndex,
      hasInteracted,
      markInteracted,
      handleSettle,
    ],
  );

  const handleFacePress = useCallback(
    (item: ScaleItem) => {
      if (disabled) return;
      Haptics.selectionAsync();
      // We write to the same value the drag uses. Because both use one value,
      // a face tap and a drag can never show different results.
      value.value = withTiming(item.value, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
      if (!hasInteracted.value) {
        hasInteracted.value = true;
        markInteracted();
      }
      handleSettle(item.value);
    },
    [disabled, value, hasInteracted, markInteracted, handleSettle],
  );

  /** With a screen reader, each swipe moves the thumb one full face. */
  const handleAccessibilityAction = useCallback(
    (event: AccessibilityActionEvent) => {
      const action = event.nativeEvent.actionName;
      if (action !== "increment" && action !== "decrement") return;
      const delta = action === "increment" ? 1 : -1;
      const nextIndex = Math.min(
        count - 1,
        Math.max(0, nearestIndexFor(value.value, count) + delta),
      );
      const next = nextIndex / (count - 1);
      value.value = withTiming(next, { duration: 180 });
      if (!hasInteracted.value) {
        hasInteracted.value = true;
        markInteracted();
      }
      handleSettle(next);
    },
    [count, value, hasInteracted, markInteracted, handleSettle],
  );

  const thumbStyle = useAnimatedStyle(() => {
    if (height <= 0) return { opacity: 0 };
    return {
      opacity: 1,
      transform: [
        { translateY: valueToY(value.value, height, count) - THUMB_HEIGHT / 2 },
        // The thumb grows while pressed. We use withTiming, not withSpring,
        // so it stops at 1.15 without passing it and coming back.
        {
          scale: withTiming(isDragging.value ? 1.15 : 1, {
            duration: 140,
            easing: Easing.out(Easing.quad),
          }),
        },
      ],
    };
  }, [height, count]);

  return (
    <View style={styles.row} onLayout={onLayout}>
      <View style={styles.card}>
        {height > 0 && (
          <View style={styles.facesLayer} pointerEvents="box-none">
            {items.map((item, index) => (
              <ScaleFace
                key={item.value}
                item={item}
                index={index}
                count={count}
                height={height}
                faceSize={faceSize}
                value={value}
                disabled={disabled}
                onPress={handleFacePress}
              />
            ))}
          </View>
        )}
      </View>

      <GestureDetector gesture={pan}>
        <View
          style={styles.trackColumn}
          accessible
          accessibilityRole="adjustable"
          accessibilityLabel="Escala de intensidade da dor"
          accessibilityHint="Deslize para cima ou para baixo para ajustar a intensidade"
          accessibilityValue={{
            min: 0,
            max: 100,
            now: Math.round(settledValue * 100),
          }}
          accessibilityState={{ disabled }}
          accessibilityActions={[
            { name: "increment", label: "Aumentar intensidade" },
            { name: "decrement", label: "Diminuir intensidade" },
          ]}
          onAccessibilityAction={handleAccessibilityAction}
        >
          <View style={styles.trackPill} pointerEvents="none" />

          {height > 0 &&
            items.map((item) => (
              <View
                key={`tick-${item.value}`}
                pointerEvents="none"
                style={[
                  styles.tick,
                  // We use the same valueToY function that places the faces,
                  // so a dot is always at the same height as its face.
                  { top: valueToY(item.value, height, count) - TICK_SIZE / 2 },
                ]}
              />
            ))}

          <Animated.View
            pointerEvents="none"
            style={[styles.thumb, thumbStyle]}
          />
        </View>
      </GestureDetector>
    </View>
  );
}

interface ScaleFaceProps {
  item: ScaleItem;
  index: number;
  count: number;
  height: number;
  faceSize: number;
  value: SharedValue<number>;
  disabled: boolean;
  onPress: (item: ScaleItem) => void;
}

function ScaleFace({
  item,
  index,
  count,
  height,
  faceSize,
  value,
  disabled,
  onPress,
}: ScaleFaceProps) {
  const { Face } = item;

  const animatedStyle = useAnimatedStyle(() => {
    const step = 1 / (count - 1);
    // How far this face is from the current value:
    // 0 means the thumb is on this face, 1 means it is one face away or more.
    // We calculate it from the exact value instead of only checking which face
    // is closest. This way the highlight moves slowly from one face to the
    // next while the thumb travels, instead of jumping.
    const t = Math.min(1, Math.abs(value.value - item.value) / step);
    return {
      opacity: 0.45 + (1 - t) * 0.55,
      transform: [{ scale: 1 + (1 - t) * 0.06 }],
    };
  }, [count]);

  return (
    <Animated.View
      style={[
        styles.face,
        {
          top: valueToY(item.value, height, count) - faceSize / 2,
          height: faceSize,
        },
        animatedStyle,
      ]}
    >
      <Pressable
        onPress={() => onPress(item)}
        disabled={disabled}
        // `accessible` joins this button and the SVG inside it into one item
        // for the screen reader. The SVG files have their own aria-label, so
        // without this the screen reader would read each face two times.
        accessible
        accessibilityRole="button"
        // First the short name, then the full phrase: "Dor moderada. Dói ainda
        // mais." The short name comes first so the user knows the level without
        // listening to the whole sentence.
        accessibilityLabel={`${item.severity}. ${item.label}`}
        accessibilityState={{ disabled }}
        style={styles.facePressable}
      >
        <Face width={faceSize} height={faceSize} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    gap: CONTAINERS.spacings.sm,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.painScale.cardBg,
    borderWidth: CARD_BORDER,
    borderColor: COLORS.painScale.cardBorder,
    borderRadius: CONTAINERS.radius.lg,
  },
  facesLayer: {
    position: "absolute",
    top: -CARD_BORDER,
    left: -CARD_BORDER,
    right: -CARD_BORDER,
    // Needs an explicit bottom: all children are absolutely positioned, so
    // without it this layer collapses to zero height and Android clips the
    // faces out of existence.
    bottom: -CARD_BORDER,
  },
  face: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  facePressable: {
    height: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trackColumn: {
    width: TRACK_COLUMN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  trackPill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: TRACK_PILL_WIDTH,
    borderRadius: CONTAINERS.radius.full,
    backgroundColor: COLORS.painScale.track,
  },
  tick: {
    position: "absolute",
    width: TICK_SIZE,
    height: TICK_SIZE,
    borderRadius: TICK_SIZE / 2,
    backgroundColor: COLORS.painScale.tick,
  },
  thumb: {
    position: "absolute",
    top: 0,
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: THUMB_HEIGHT / 2,
    backgroundColor: COLORS.painScale.thumb,
  },
});
