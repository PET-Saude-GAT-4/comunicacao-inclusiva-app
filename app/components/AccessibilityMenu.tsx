import { usePreferences } from "@/hooks/usePreferences";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  isTextMode: boolean;
  onToggleTextMode: () => void;
}

export function AccessibilityMenu({ isTextMode, onToggleTextMode }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { displayMode, toggleDisplayMode } = usePreferences();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {/* Alto-contraste 
          Inserido pós mvp
          */}
          {/* <TouchableOpacity style={styles.optionPill} onPress={() => {}}>
            <MaterialCommunityIcons name="circle-half-full" size={20} color="#FFF" />
            <Text style={styles.optionText}>Alto-contraste</Text>
          </TouchableOpacity> */}

          {/* Modo de texto */}
          <TouchableOpacity
            style={[styles.optionPill, isTextMode && styles.activePill]}
            onPress={() => {
              onToggleTextMode();
              setIsOpen(false);
            }}
          >
            <MaterialCommunityIcons name="format-text" size={20} color="#FFF" />
            <Text style={styles.optionText}>
              {isTextMode ? "Sair do Modo de texto" : "Modo de texto"}
            </Text>
          </TouchableOpacity>

          {/* Modo Libras */}
          <TouchableOpacity 
            style={[styles.optionPill, displayMode === "signWriting" && styles.activePill]} 
            onPress={() => {
              toggleDisplayMode();
              setIsOpen(false);
            }}
          >
            <MaterialCommunityIcons
              name="sign-language"
              size={20}
              color="#FFF"
            />
            <Text style={styles.optionText}>Modo Libras</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name={isOpen ? "close" : "human-handsup"}
          size={28}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: CONTAINERS.spacings.lg,
    right: CONTAINERS.spacings.lg,
    alignItems: "flex-end",
    zIndex: 100,
  },
  optionsContainer: {
    marginBottom: CONTAINERS.spacings.sm,
    alignItems: "flex-end",
    gap: CONTAINERS.spacings.sm,
  },
  optionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingVertical: CONTAINERS.spacings.sm,
    paddingHorizontal: CONTAINERS.spacings.md,
    borderRadius: CONTAINERS.radius.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    gap: CONTAINERS.spacings.sm,
  },
  activePill: {
    backgroundColor: COLORS.primaryDark,
  },
  optionText: {
    color: "#FFF",
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: "500",
  },
  fab: {
    backgroundColor: COLORS.secondary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
