import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CommBoardStackNavigator from "./CommBoardStackNavigator";

const MainTabs = createBottomTabNavigator();

/* 
        This tab navigator is going to lead into the stack navigator of each tab located
    in the bottom nav bar
*/
export default function MainTabNavigator() {
  /* 
            As an example, we have this Screen leading into one of the tabs,
        what would be "Prancha Livre", here as "Comm(unication)Board".
            Do note, that we go from a Tab Navigator into a Stack Navigator which 
        allows for better flow within all screens related to "Prancha Livre"
    */
  return (
    <MainTabs.Navigator screenOptions={{ headerShown: false }}>
      <MainTabs.Screen
        name="CommBoardStackNav"
        component={CommBoardStackNavigator}
        options={{}}
      />
    </MainTabs.Navigator>
  );
}
