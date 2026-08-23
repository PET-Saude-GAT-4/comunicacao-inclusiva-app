import { COLORS, CONTAINERS } from "@/styles/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

export function PainScaleTrigger({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Abrir escala de intensidade"
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons
        name="emoticon-outline"
        size={24}
        color={COLORS.text.onSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    position: "absolute",
    left: 0,
    top: "55%",
    width: 44,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    borderTopRightRadius: CONTAINERS.radius.md,
    borderBottomRightRadius: CONTAINERS.radius.md,
    zIndex: 100,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pressed: {
    opacity: 0.85,
  },
});
