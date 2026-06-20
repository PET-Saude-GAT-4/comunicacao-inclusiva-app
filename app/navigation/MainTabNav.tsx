import { useSyncEngine } from "@/hooks/useSyncEngine";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";

import GlobalHeader from "@/components/GlobalHeaderComponent";
import { Appbar } from "react-native-paper";
import CommBoardStackNavigator from "./main-tabs/comm-board/CommBoardStackNav";
import EmergencyTabNav from "./main-tabs/emergency/EmergencyTabNav";
import SettingsStackNav from "./main-tabs/settings/SettingsStackNav";

import { OfflineBanner } from "@/components/OfflineBanner";
import { ConsultationMenuModal } from "@/components/ConsultationMenuModal";
// *.*
import { SpeakerToggleButton } from "@/components/SpeakerToggleButton";
import { Platform, View } from "react-native";
import LibraryTabNav from "./main-tabs/library/LibraryTabNav";
import MyCollectionStackNav from "./main-tabs/my-collection/MyCollectionStackNav";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const MainTabs = createBottomTabNavigator();

/* 
        This tab navigator is going to lead into the stack navigator of each tab located
    in the bottom nav bar
*/
export default function MainTabNav() {
  // Sync runs once when the user enters the app, not per screen
  const { isError } = useSyncEngine();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Show banner whenever sync reports an error
  useEffect(() => {
    if (isError) setBannerVisible(true);
  }, [isError]);

  return (
    <View style={{ flex: 1 }}>
      <MainTabs.Navigator
        screenOptions={{
          header: (props) => (
            <>
              <GlobalHeader {...props} />
              <OfflineBanner
                visible={bannerVisible}
                onClose={() => setBannerVisible(false)}
              />
            </>
          ),
        }}
      >
        <MainTabs.Screen
          name="CommBoardStackNav"
          component={CommBoardStackNavigator}
          options={{
            title: "Prancha Livre",
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 8,
                  gap: 8,
                }}
              >
                <SpeakerToggleButton />
                <Appbar.Action icon={MORE_ICON} onPress={() => setMenuVisible(true)} />
              </View>
            ),
          }}
        />
        <MainTabs.Screen
          name="BoardCollection"
          component={MyCollectionStackNav}
          options={{
            headerShown: false,
            title: "Minha Coleção",
            headerRight: () => (
              //*.*
              <Appbar.Action icon={MORE_ICON} onPress={() => setMenuVisible(true)} />
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
              <Appbar.Action icon={MORE_ICON} onPress={() => setMenuVisible(true)} />
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
      <ConsultationMenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}
