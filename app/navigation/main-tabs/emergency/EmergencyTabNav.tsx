import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import { Text, View } from "react-native";
import CatEmergencyStackNav from "./top-tabs/CatEmergencyStackNav";
import QuickEmergencyStackNav from "./top-tabs/QuickEmergencyStackNav";

const Placeholder = () => {
  return (
    <View>
      <Text>this is a placeholder</Text>
    </View>
  );
};

const TopTabs = createMaterialTopTabNavigator();

export default function EmergencyTabNav() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen
        name="QuickEmergency"
        component={QuickEmergencyStackNav}
      />
      <TopTabs.Screen name="CatEmergency" component={CatEmergencyStackNav} />
    </TopTabs.Navigator>
  );
}
