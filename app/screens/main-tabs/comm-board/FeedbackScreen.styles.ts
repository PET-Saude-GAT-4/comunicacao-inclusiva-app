import { StyleSheet } from "react-native";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: CONTAINERS.spacings.md,
  },

  // Speaker label
  speakerLabel: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text.onPrimary,
    marginBottom: CONTAINERS.spacings.sm,
  },

  // Read-only visor showing the sent pictograms/text
  visor: {
    backgroundColor: COLORS.surface.secondary,
    borderRadius: CONTAINERS.radius.lg,
    padding: CONTAINERS.spacings.sm,
    minHeight: 110,
    justifyContent: "center",
  },
  visorScrollContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  visorPictogramItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
  },
  visorPictogramImage: {
    width: 80,
    height: 80,
  },
  visorPictogramText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 2,
  },
  visorTextContent: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text.onPrimary,
    paddingHorizontal: CONTAINERS.spacings.sm,
  },

  // Decorative audio button
  audioButtonContainer: {
    alignItems: "center",
    marginVertical: CONTAINERS.spacings.lg,
  },
  audioButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surface.secondary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  },

  // Feedback buttons container
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginTop: CONTAINERS.spacings.md,
  },

  // Shared card base
  feedbackCard: {
    width: 140,
    height: 140,
    borderRadius: CONTAINERS.radius.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },

  // "ENTENDI" card
  understoodCard: {
    backgroundColor: "#E8F5E9",
  },

  // "TENHO DÚVIDA" card
  doubtCard: {
    backgroundColor: "#F5E0E7",
  },

  feedbackIcon: {
    marginBottom: 8,
  },

  understoodText: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
    textAlign: "center",
  },

  doubtText: {
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.secondary,
    textAlign: "center",
  },
});
