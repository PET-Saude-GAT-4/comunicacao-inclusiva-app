import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { StyleSheet } from "react-native";

export const styling = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface.secondary,
    borderRadius: CONTAINERS.radius.full,
    marginHorizontal: 10,
    marginTop: 8,
    paddingHorizontal: 0,
    paddingVertical: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: "auto",
  },
  indicator: {
    backgroundColor: COLORS.primaryDark,
    height: "100%",
    borderRadius: CONTAINERS.radius.full,
  },
  indicatorContainer: {
    margin: 0,
  },
  label: {
    fontWeight: TYPOGRAPHY.weights.bold,
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    textTransform: "none",
  },
});

export const screenOptions = {
  tabBarActiveTintColor: COLORS.text.onPrimaryDark,
  tabBarInactiveTintColor: COLORS.text.onPrimary,
  tabBarPressColor: "transparent",
  tabBarLabelStyle: styling.label,
  tabBarStyle: styling.tabBar,
  tabBarIndicatorStyle: styling.indicator,
  tabBarIndicatorContainerStyle: styling.indicatorContainer,
  tabBarItemStyle: { padding: 0 },
};
