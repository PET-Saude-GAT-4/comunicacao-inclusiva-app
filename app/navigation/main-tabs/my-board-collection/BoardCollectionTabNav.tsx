import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = createMaterialTopTabNavigator();

export default function () {
  return (
    <TopTabs.Navigator>
        <TopTabs.Screen
        name="Boards"
        component={() => <></>}
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
