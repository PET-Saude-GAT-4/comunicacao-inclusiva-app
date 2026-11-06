import { HOT_BAR } from "@/navigation/MainTab.style";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Bottom space a screen must leave free so its content can scroll out from
 * under the floating hot-bar. Returns 0 outside the main tab navigator.
 */
export function useHotBarInset() {
  const tabBarHeight = useContext(BottomTabBarHeightContext);
  const insets = useSafeAreaInsets();

  if (!tabBarHeight) return 0;

  return tabBarHeight + insets.bottom + HOT_BAR.bottomGap * 2;
}
