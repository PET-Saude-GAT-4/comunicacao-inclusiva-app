import { StyleSheet } from "react-native";

import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";

// Hot-bar geometry from the Figma "Mobile / Barra de navegação" component:
// a floating bar 8px from the sides and 12px above the bottom safe area.
export const HOT_BAR = {
  height: 71,
  sideGap: 8,
  bottomGap: 12,
  iconSize: 28,
};

export const styling = StyleSheet.create({
  container: {
    position: "absolute",
    left: HOT_BAR.sideGap,
    right: HOT_BAR.sideGap,
    gap: 8,
  },
  tabBar: {
    height: HOT_BAR.height,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#DFE5E2",
    borderRadius: CONTAINERS.radius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 4,
  },
  tabBarItem: {
    justifyContent: "center",
    paddingVertical: 0,
  },
  label: {
    fontFamily: TYPOGRAPHY.font.title,
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 14,
    marginTop: 4,
    textTransform: "none",
  },
});

export const screenOptions = {
  tabBarActiveTintColor: COLORS.primaryDark,
  tabBarInactiveTintColor: COLORS.text.onPrimary,
  tabBarLabelPosition: "below-icon",
  tabBarLabelStyle: styling.label,
  tabBarItemStyle: styling.tabBarItem,
  tabBarStyle: styling.tabBar,
} as const;
