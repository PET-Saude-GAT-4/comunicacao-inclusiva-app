import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import GlobalHeader from "@/components/GlobalHeaderComponent";
import { Appbar } from "react-native-paper";
import CommBoardStackNavigator from "./main-tabs/comm-board/CommBoardStackNav";
import EmergencyTabNav from "./main-tabs/emergency/EmergencyTabNav";
import SettingsStackNav from "./main-tabs/settings/SettingsStackNav";

// *.*
import { Platform } from "react-native";
import BoardCollectionTabNav from "./main-tabs/my-collection/BoardCollectionTabNav";
import LibraryTabNav from "./main-tabs/library/LibraryTabNav";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

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
    <MainTabs.Navigator screenOptions={{ header: GlobalHeader }}>
      <MainTabs.Screen
        name="CommBoardStackNav"
        component={CommBoardStackNavigator}
        options={{
          title: "Prancha Livre",
          headerRight: () => (
            //*.*
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
          ),
        }}
      />
      <MainTabs.Screen
        name="BoardCollection"
        component={BoardCollectionTabNav}
        options={{
          title: "Minha Coleção",
          headerRight: () => (
            //*.*
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
          ),
        }}
      />
      <MainTabs.Screen
        name="Emergency"
        component={EmergencyTabNav}
        options={{
          title: "Emergência",
          headerRight: () => <></>,
        }}
      />

      <MainTabs.Screen
        name="Library"
        component={LibraryTabNav}
        options={{
          title: "Biblioteca",
          headerRight: () => (
            //*.*
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
          ),
        }}
      />

      <MainTabs.Screen
        name="Settings"
        component={SettingsStackNav}
        options={{
          title: "Configurações",
          headerRight: () => <></>,
        }}
      />
    </MainTabs.Navigator>
  );
}
