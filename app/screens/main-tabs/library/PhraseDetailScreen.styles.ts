import { COLORS, TYPOGRAPHY } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineCommon,
  },
  phraseTitle: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.heading,
    fontWeight: "700",
    color: COLORS.text.onPrimary,
    marginLeft: 8,
  },
  icons: {
    flexDirection: "row",
    gap: 16,
  },
  delete: {
    opacity: 0.8,
  },
  edit: {
    opacity: 0.8,
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  pictogramDiv: {
    flex: 1,
    alignItems: "center",
    margin: 8,
    gap: 8,
  },
  pictogramImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  pictogramText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.onPrimary,
    textAlign: "center",
  },
});
