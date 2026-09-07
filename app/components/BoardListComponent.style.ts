import { COLORS } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  boardBackground: {
    backgroundColor: COLORS.surface.secondary,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    color: COLORS.text.onPrimary,
  },
  boardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  divider: {
    width: 2,
    height: 80,
    backgroundColor: COLORS.outlineCommon,
    marginHorizontal: 8,
  },
  boardInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  boradTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  pictogramCount: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.text.onPrimaryVariant,
  },
  saveButton: {
    padding: 8,
    marginRight: 4,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    color: COLORS.text.onPrimaryVariant,
  },
});
