import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styling = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface.secondary,
    borderRadius: CONTAINERS.radius.lg,
    paddingTop: 10,
    paddingInline: 10,
  },
  label: {
    fontWeight: TYPOGRAPHY.weights.bold,
    fontSize: TYPOGRAPHY.sizes.small,
    textTransform: "none",
  },
});

export const screenOptions = {
  tabBarActiveTintColor: COLORS.primaryDark,
  tabBarInactiveTintColor: COLORS.text.onPrimary,
  tabBarLabelStyle: styling.label,
  tabBarStyle: styling.tabBar,
};
