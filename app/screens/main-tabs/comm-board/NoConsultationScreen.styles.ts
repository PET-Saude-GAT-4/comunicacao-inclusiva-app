import { StyleSheet } from "react-native";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: CONTAINERS.spacings.xl,
  },
  content: {
    alignItems: "center",
    gap: CONTAINERS.spacings.md,
  },
  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.surface.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: CONTAINERS.spacings.lg,
  },
  title: {
    fontFamily: TYPOGRAPHY.font.title,
    fontSize: 25,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primaryDark,
    textAlign: "center",
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.font.body,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.regular,
    color: COLORS.text.onPrimaryVariant,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: CONTAINERS.spacings.lg,
  },
  startButton: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: CONTAINERS.spacings.md,
    paddingHorizontal: CONTAINERS.spacings.xxl,
    borderRadius: CONTAINERS.radius.full,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginTop: CONTAINERS.spacings.sm,
  },
  startButtonText: {
    fontFamily: TYPOGRAPHY.font.body,
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.onPrimaryDark,
  },
});
