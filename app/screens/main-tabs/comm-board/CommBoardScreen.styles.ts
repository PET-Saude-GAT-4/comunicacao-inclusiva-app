import { StyleSheet } from "react-native";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "../../../styles/themes"; // Pegando as cores do design system

export const styles = StyleSheet.create({
  text: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: TYPOGRAPHY.weights.medium,
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sendButton: {
    backgroundColor: "#00e0ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
