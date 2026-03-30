import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import AddBoardStackNav from "./top-tabs/AddBoardStackNav";
import MyBoardsStackNav from "./top-tabs/MyBoardsStackNav";

const TopTabs = createMaterialTopTabNavigator();

export default function MainTabNavigator() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="MyBoards" component={MyBoardsStackNav} />
      <TopTabs.Screen name="AddBoard" component={AddBoardStackNav} />
    </TopTabs.Navigator>
  );
}
