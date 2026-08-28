import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: CONTAINERS.spacings.lg,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.title,
    fontWeight: "bold",
    color: COLORS.text.onPrimary,
    marginBottom: CONTAINERS.spacings.xl,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: CONTAINERS.radius.lg,
    padding: CONTAINERS.spacings.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: CONTAINERS.spacings.md,
  },
  settingTitle: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "600",
    color: COLORS.text.onPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.text.onPrimaryVariant,
  },
});
