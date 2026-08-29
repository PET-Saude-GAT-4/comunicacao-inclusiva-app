import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: CONTAINERS.spacings.md,
    gap: CONTAINERS.spacings.md,
  },
  card: {
    backgroundColor: COLORS.surface.primary,
    borderRadius: CONTAINERS.radius.md,
    padding: CONTAINERS.spacings.md,
    // Note: use explicit shadow or elevation if needed since shadow property isn't in themes
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: CONTAINERS.spacings.sm,
  },
  saveButton: {
    padding: 4,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "700",
    color: COLORS.text.onPrimary,
  },
  visorScrollContent: {
    gap: 8,
  },
  termItem: {
    width: 60,
    alignItems: "center",
    gap: 4,
  },
  termImage: {
    width: 60,
    height: 60,
    borderRadius: CONTAINERS.radius.sm,
    backgroundColor: COLORS.surface.secondary,
  },
  termText: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.text.onPrimaryVariant,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: CONTAINERS.spacings.xl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    color: COLORS.text.onPrimaryVariant,
    textAlign: "center",
  },
});
