import { StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../../styles/themes"; 

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
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 12,
  },
  pictrogramImage: {
    width: 80,
    height: 80,
  },
  categoriesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineCommon,
  },
  categoriesScroll: {
    flex: 1,
  },
  categoryItem: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryItemSelected: {
    borderColor: COLORS.primaryDark,
  },
  categoryGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  categoryImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111",
    marginTop: 4,
  },
  searchButtonContainer: {
    paddingLeft: 12,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputContainer: {
    flex: 1,
    marginRight: 12,
  },
  searchInput: {
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    color: COLORS.text.onPrimary,
  },
});
