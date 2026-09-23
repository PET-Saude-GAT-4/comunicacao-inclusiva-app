import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import BoardStackNav from "./tabs/BoardStackNav";
import { screenOptions } from "../TopTabs.style";

import MyPhraseScreen from "@/screens/main-tabs/my-collection/tabs/MyPhraseScreen";

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
        component={MyPhraseScreen}
        options={{ title: "Interações" }}
      />
    </TopTabs.Navigator>
  );
}
