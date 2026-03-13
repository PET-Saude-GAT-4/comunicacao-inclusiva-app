import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const GlobalHeader = ({ route, options }: BottomTabHeaderProps) => {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title={options.title || route.name} />
    </Appbar.Header>
  );
};

export default GlobalHeader;
