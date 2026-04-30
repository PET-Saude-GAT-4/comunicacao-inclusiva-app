import * as React from "react";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const GlobalHeader = ({ route, options, navigation }: any) => {
  const canGoBack = navigation.canGoBack();
  return (
    <Appbar.Header mode="center-aligned">
      {canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
      <Appbar.Content title={options.title || route.name} />
      {options.headerRight && options.headerRight()}
    </Appbar.Header>
  );
};

export default GlobalHeader;
