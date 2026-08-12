import { COLORS, CONTAINERS } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: CONTAINERS.spacings.lg,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text.onPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.onPrimaryVariant,
    lineHeight: 20,
  },
  listContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: COLORS.outlineCommon,
  },
  cancelButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.onPrimary,
  },
  nextButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 32,
    backgroundColor: COLORS.primaryDark,
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.outlineCommon,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.onPrimaryDark,
  },
});
