import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CommBoardStackNavigator from "./main-tabs/comm-board/CommBoardStackNav";
import ReadyInteractionsTabNav from "./main-tabs/ready-interactions/ReadyInteractionsTabNav";
import BoardCollectionTabNav from "./main-tabs/board-collection/BoardCollectionTabNav";
import SettingsStackNav from "./main-tabs/settings/SettingsStackNav";
import EmergencyTabNav from "./main-tabs/emergency/EmergencyTabNav";


const MainTabs = createBottomTabNavigator();

/* 
        This tab navigator is going to lead into the stack navigator of each tab located
    in the bottom nav bar
*/
export default function MainTabNav() {
  /* 
            As an example, we have this Screen leading into one of the tabs,
        what would be "Prancha Livre", here as "Comm(unication)Board".
            Do note, that we go from a Tab Navigator into a Stack Navigator which 
        allows for better flow within all screens related to "Prancha Livre"
    */
  return (
    <MainTabs.Navigator >
      <MainTabs.Screen
        name="CommBoardStackNav"
        component={CommBoardStackNavigator}
        options={{}}
      />
      <MainTabs.Screen
        name="ReadyInteractions"
        component={ReadyInteractionsTabNav}
        options={{}}
      />
        <MainTabs.Screen
        name="Emergency"
        component={EmergencyTabNav}
        options={{}}
      />
      <MainTabs.Screen
        name="BoardCollection"
        component={BoardCollectionTabNav}
        options={{}}
      />
      <MainTabs.Screen
        name="Settings"
        component={SettingsStackNav}
        options={{}}
      />
    </MainTabs.Navigator>
  );
}
