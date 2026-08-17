import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BoardLibStackNav from "./Tabs/BoardStackNav";
import { screenOptions } from "../TopTabs.style";

const TopTabs = createMaterialTopTabNavigator();

export default function LibraryTabNav() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        ...screenOptions
      }}
    >
      <TopTabs.Screen
        name="Library-Board"
        component={BoardLibStackNav}
        options={{ title: "Biblioteca" }}
      />
      <TopTabs.Screen
        name="Library-Interactions"
        component={() => <></>}
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