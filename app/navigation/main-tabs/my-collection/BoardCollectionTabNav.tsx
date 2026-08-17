import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import BoardStackNav from "./tabs/BoardStackNav";
import { screenOptions } from "../TopTabs.style";

const TopTabs = createMaterialTopTabNavigator();

export default function () {
  return (
    <TopTabs.Navigator
      screenOptions={{
        ...screenOptions,
      }}
    >
      <TopTabs.Screen
        name="Boards"
        component={BoardStackNav}
        options={{ title: "Pranchas" }}
      />
      <TopTabs.Screen
        name="ReadyInteractions"
        component={() => <></>}
        options={{ title: "Interações" }}
      />
    </TopTabs.Navigator>
  );
}
