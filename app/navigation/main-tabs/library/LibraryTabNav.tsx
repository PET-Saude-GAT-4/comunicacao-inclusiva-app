import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BoardLibStackNav from "./Tabs/BoardStackNav";
import { screenOptions } from "../TopTabs.style";
import PhraseLibStackNav from "./Tabs/PhraseLibStackNav";

const TopTabs = createMaterialTopTabNavigator();

export default function LibraryTabNav() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        ...screenOptions,
      }}
    >
      <TopTabs.Screen
        name="Library-Board"
        component={BoardLibStackNav}
        options={{ title: "Pranchas" }}
      />
      <TopTabs.Screen
        name="Library-Interactions"
        component={PhraseLibStackNav}
        options={{ title: "Interações" }}
      />
      <TopTabs.Screen
        name="Library-Emergency-Modules"
        component={() => <></>}
        options={{ title: "Módulos" }}
      />
    </TopTabs.Navigator>
  );
}