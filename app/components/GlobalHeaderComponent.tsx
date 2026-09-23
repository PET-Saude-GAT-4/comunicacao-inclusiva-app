import { COLORS, TYPOGRAPHY } from "@/styles/themes";
import * as React from "react";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const GlobalHeader = ({ route, options, navigation }: any) => {
  const canGoBack = navigation.canGoBack();
  return (
    <Appbar.Header mode="center-aligned" style={{backgroundColor: COLORS.background}} >
      {canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} iconColor={COLORS.text.onPrimary} />}
      <Appbar.Content title={options.title || route.name} titleStyle={{color: COLORS.text.onPrimary,  fontFamily: TYPOGRAPHY.font.title, fontSize: 24, fontWeight: TYPOGRAPHY.weights.bold }} />
      {options.headerRight && options.headerRight()}
    </Appbar.Header>
  );
};

export default GlobalHeader;
