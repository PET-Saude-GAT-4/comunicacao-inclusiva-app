import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  listContent: {
    gap: CONTAINERS.spacings.md,
    paddingBottom: 24,
  },
  saveButton: {
    padding: 4,
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
