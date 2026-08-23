import { PAIN_SCALE_FACES } from "@/constants/painScaleFaces";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { nearestIndexFor } from "./geometry";
import { PainScaleSlider, TRACK_COLUMN_WIDTH } from "./PainScaleSlider";
import type { PainScaleSubmission, ScaleItem } from "./types";

const PANEL_WIDTH_RATIO = 0.58;
const PANEL_HEIGHT_RATIO = 0.7;
const PANEL_LEFT_MARGIN = 8;

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (submission: PainScaleSubmission) => void | Promise<void>;
  items?: ScaleItem[];
  /** Where the thumb starts, from 0 to 1. Send is off until the user acts. */
  initialValue?: number;
  /** Called when the value stops changing, not on every frame of a drag. */
  onValueChange?: (value: number) => void;
  title?: string;
}

export function PainScaleTray({
  visible,
  onClose,
  onSubmit,
  items = PAIN_SCALE_FACES,
  initialValue = 0.5,
  onValueChange,
  title = "Escala de Intensidade",
}: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  /**
   * This is separate from `visible` so the panel can finish its closing
   * animation before the Modal is removed. If we used `visible` directly, the
   * panel would disappear at once and nobody would see it slide out.
   */
  const [mounted, setMounted] = useState(visible);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** We add 1 on each open, to tell the slider to update its saved value. */
  const [resetToken, setResetToken] = useState(0);

  // We use a ref, not state, because a ref changes immediately. With state,
  // two fast taps in the same frame would both see the old value and send twice.
  const submittingRef = useRef(false);

  const value = useSharedValue(initialValue);
  const progress = useSharedValue(0);

  const panelWidth = Math.round(width * PANEL_WIDTH_RATIO);
  const panelHeight = Math.round(
    Math.min(
      height * PANEL_HEIGHT_RATIO,
      height - insets.top - insets.bottom - CONTAINERS.spacings.lg * 2,
    ),
  );

  useEffect(() => {
    if (visible) {
      // The tray is opening again, so nothing is chosen yet and Send is off.
      value.value = initialValue;
      setHasInteracted(false);
      setSubmitError(null);
      setResetToken((token) => token + 1);
      setMounted(true);
      progress.value = withTiming(1, {
        duration: 240,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = withTiming(
        0,
        { duration: 200, easing: Easing.in(Easing.cubic) },
        (finished) => {
          if (finished) scheduleOnRN(setMounted, false);
        },
      );
    }
  }, [visible, initialValue, value, progress]);

  const panelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: -(panelWidth + PANEL_LEFT_MARGIN) * (1 - progress.value),
      },
    ],
  }));

  const scrimStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  const handleInteract = useCallback(() => setHasInteracted(true), []);

  const handleClose = useCallback(() => {
    if (submittingRef.current) return;
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(async () => {
    if (submittingRef.current || !hasInteracted) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    // We can read a shared value from normal code, so we get the thumb position
    // here, at send time. We do not need to copy it into state on every frame.
    const current = value.value;
    const submission: PainScaleSubmission = {
      value: current,
      nearestIndex: nearestIndexFor(current, items.length),
    };

    try {
      await onSubmit?.(submission);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onClose();
    } catch {
      setSubmitError("Não foi possível enviar. Tente novamente.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [hasInteracted, items.length, onSubmit, onClose, value]);

  const canSubmit = hasInteracted && !isSubmitting;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      {/*
        We need a second GestureHandlerRootView here. It is not a copy by
        mistake: a Modal draws in its own separate native view, and the one in
        App.tsx does not reach inside it. Without this, the track does not
        receive any touch. Tapping a face still works, because Pressable uses
        the normal React Native touch system, not gesture-handler.
      */}
      <GestureHandlerRootView style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, scrimStyle]}>
          <Pressable
            style={[StyleSheet.absoluteFill, styles.scrim]}
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Fechar escala de intensidade"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.panel,
            { width: panelWidth, height: panelHeight },
            panelStyle,
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Pressable
              onPress={handleClose}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Fechar escala de intensidade"
              style={styles.closeButton}
            >
              <Ionicons name="close" size={22} color={COLORS.text.onPrimary} />
            </Pressable>
          </View>

          <PainScaleSlider
            items={items}
            value={value}
            disabled={isSubmitting}
            onInteract={handleInteract}
            onSettle={onValueChange}
            resetToken={resetToken}
          />

          {submitError && (
            <Text style={styles.error} accessibilityLiveRegion="polite">
              {submitError}
            </Text>
          )}

          <View style={styles.footer}>
            <Pressable
              onPress={handleSubmit}
              disabled={!canSubmit}
              accessibilityRole="button"
              accessibilityLabel="Enviar intensidade"
              accessibilityState={{ disabled: !canSubmit }}
              style={({ pressed }) => [
                styles.submitButton,
                !canSubmit && styles.submitButtonDisabled,
                pressed && canSubmit && styles.submitButtonPressed,
              ]}
            >
              {isSubmitting ? (
                <ActivityIndicator color={COLORS.painScale.submitFg} />
              ) : (
                <Ionicons
                  name="send"
                  size={24}
                  color={COLORS.painScale.submitFg}
                />
              )}
            </Pressable>
          </View>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  scrim: {
    backgroundColor: COLORS.painScale.scrim,
  },
  panel: {
    marginLeft: PANEL_LEFT_MARGIN,
    backgroundColor: COLORS.painScale.panelBg,
    borderRadius: CONTAINERS.radius.lg,
    padding: CONTAINERS.spacings.md,
    gap: CONTAINERS.spacings.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: CONTAINERS.spacings.sm,
  },
  title: {
    flexShrink: 1,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.onPrimary,
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.errorPrimary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  submitButton: {
    width: TRACK_COLUMN_WIDTH,
    height: 56,
    borderRadius: CONTAINERS.radius.sm,
    backgroundColor: COLORS.painScale.submitBg,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
  submitButtonPressed: {
    opacity: 0.8,
  },
});
