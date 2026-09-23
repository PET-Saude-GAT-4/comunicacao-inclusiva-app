import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.secondary,
    borderRadius: CONTAINERS.radius.lg,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    paddingHorizontal: CONTAINERS.spacings.md,
    paddingVertical: CONTAINERS.spacings.sm,
    gap: 8,
  },
  icon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body,
    fontFamily: TYPOGRAPHY.font.body,
    color: COLORS.text.onPrimary,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});
