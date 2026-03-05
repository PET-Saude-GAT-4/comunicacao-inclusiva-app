import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import { Text, View } from "react-native";
import AddInteractionStackNav from "./top-tabs/AddInteractionStackNav";
import MyInteractionsStackNav from "./top-tabs/MyInteractionsStackNav";

const Placeholder = () => {
  return (
    <View>
      <Text>this is a placeholder</Text>
    </View>
  );
};

const TopTabs = createMaterialTopTabNavigator();

export default function ReadyInteractionsTabNav() {
  return (
    <TopTabs.Navigator >
      <TopTabs.Screen
        name="MyInteractions"
        component={MyInteractionsStackNav}
      />
      <TopTabs.Screen
        name="AddInteractions"
        component={AddInteractionStackNav}
      />
    </TopTabs.Navigator>
  );
}
