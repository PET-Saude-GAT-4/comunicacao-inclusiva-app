import { COLORS, CONTAINERS } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: CONTAINERS.spacings.md,
    gap: 12,
    backgroundColor: COLORS.surface.secondary,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    borderRadius: CONTAINERS.radius.lg,
  },
  cardTitle: {
    fontFamily: "Roboto",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#000000",
  },
  divider: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: COLORS.outlineCommon,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 10,
  },
  pictogramsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  pictogramItem: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.surface.primary,
    borderRadius: CONTAINERS.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  pictogramImage: {
    width: 40,
    height: 47,
  },
  pictogramLabel: {
    position: "absolute",
    bottom: 4,
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 9,
    lineHeight: 11,
    textAlign: "center",
    color: "#000000",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: "#BEC9C5",
    justifyContent: "center",
    alignItems: "center",
  },
});
