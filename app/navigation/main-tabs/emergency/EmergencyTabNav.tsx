import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import { screenOptions } from "../TopTabs.style";
import CatEmergencyStackNav from "./top-tabs/CatEmergencyStackNav";
import QuickEmergencyStackNav from "./top-tabs/QuickEmergencyStackNav";

const TopTabs = createMaterialTopTabNavigator();

export default function EmergencyTabNav() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        ...screenOptions,
      }}
    >
      <TopTabs.Screen
        name="QuickEmergency"
        component={QuickEmergencyStackNav}
        options={{ title: "Emergência Rápida" }}
      />
      <TopTabs.Screen
        name="CatEmergency"
        component={CatEmergencyStackNav}
        options={{ title: "Categorias" }}
      />
    </TopTabs.Navigator>
  );
}
