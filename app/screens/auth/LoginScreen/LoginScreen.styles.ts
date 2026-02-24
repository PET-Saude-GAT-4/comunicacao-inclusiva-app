import { StyleSheet } from "react-native";

import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  headerText: {
    textAlign: "center",
    fontSize: TYPOGRAPHY.sizes.extravagantTitle,
    fontFamily: TYPOGRAPHY.font.title,
    fontWeight: "700",
    paddingBlock: CONTAINERS.spacings.md,
  },
  generalContainer: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingBlock: CONTAINERS.spacings.xl,
    paddingInline: CONTAINERS.spacings.xl,
    borderTopRightRadius: CONTAINERS.radius.xl,
    borderTopLeftRadius: CONTAINERS.radius.xl,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBlock: CONTAINERS.spacings.md,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderRadius: CONTAINERS.radius.md,
    marginBlock: CONTAINERS.spacings.md,
    backgroundColor: COLORS.surface.secondary,
  },
  hyperlinkText: {
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    marginBlock: CONTAINERS.spacings.sm,
    fontWeight: "500",
    color: COLORS.text.onPrimary,
  },
  button: {
    marginBlock: CONTAINERS.spacings.md,
    paddingBlock: CONTAINERS.spacings.xs,
  },
});

export default styles;
