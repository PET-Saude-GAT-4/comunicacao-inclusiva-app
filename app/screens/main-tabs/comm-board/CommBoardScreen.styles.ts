import { StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../../styles/themes"; // Pegando as cores do design system

export const styles = StyleSheet.create({
  text: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 8,
    color: COLORS.text.onPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  visorContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  listSelectedPictograms: {
    backgroundColor: COLORS.surface.secondary,
    height: 100,
    borderRadius: 20,
  },
  selectedPictrogramDiv: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  gridContainer: {
    flex: 2,
    padding: 16,
    backgroundColor: COLORS.surface.secondary,
  },
  selectedPictrogramImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  pictrogramDiv: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pictrogramImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
});
