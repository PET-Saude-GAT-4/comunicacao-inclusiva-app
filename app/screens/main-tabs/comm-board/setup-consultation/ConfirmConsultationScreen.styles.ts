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
  summaryContainer: {
    flex: 1,
    gap: 16,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    borderRadius: 24,
    padding: 20,
  },
  iconContainer: {
    backgroundColor: "rgba(0, 107, 95, 0.1)",
    padding: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text.onPrimaryVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryDark,
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
    paddingHorizontal: 24,
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
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 32,
    backgroundColor: COLORS.primaryDark,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.onPrimaryDark,
  },
});
