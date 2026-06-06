import { StyleSheet } from "react-native";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "../../../styles/themes";

export const styles = StyleSheet.create({
  header: {
    fontSize: TYPOGRAPHY.sizes.heading,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primaryDark,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineCommon,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 8,
    paddingBottom: 16,
  },

  pictogramDiv: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 8,
  },
  pictogramScroll: {
    height: 100,
  },
  pictogramImage: {
    width: 80,
    height: 80,
  },
  pictogramText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  bubbleProfessional: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primaryDark + "26",
    borderRadius: 16,
    padding: 12,
    maxWidth: "75%",
    marginVertical: 6,
    marginHorizontal: 12,
  },

  bubblePatient: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.secondary + "1F",
    borderRadius: 16,
    padding: 12,
    maxWidth: "75%",
    marginVertical: 6,
    marginHorizontal: 12,
  },

  title: {
    fontSize: TYPOGRAPHY.sizes.small,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.onPrimaryVariant,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  timestamp: {
    fontSize: TYPOGRAPHY.sizes.small,
    color: COLORS.text.onPrimaryVariant,
    marginBottom: 4,
    textAlign: "right",
  },

  text: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.text.onPrimary,
  },

  confusionText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    color: COLORS.secondary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineCommon,
    backgroundColor: COLORS.background,
  },

  newConsultationButton: {
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
    borderRadius: CONTAINERS.radius.full,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  newConsultationText: {
    color: COLORS.primaryDark,
    fontSize: TYPOGRAPHY.sizes.body,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});
