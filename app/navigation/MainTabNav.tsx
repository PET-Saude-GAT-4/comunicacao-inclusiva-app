import { useSession } from "@/hooks/useSession";
import { useSyncEngine } from "@/hooks/useSyncEngine";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";

import GlobalHeader from "@/components/GlobalHeaderComponent";
import { Appbar } from "react-native-paper";
import CommBoardStackNavigator from "./main-tabs/comm-board/CommBoardStackNav";
import SettingsStackNav from "./main-tabs/settings/SettingsStackNav";

import { ConsultationMenuModal } from "@/components/ConsultationMenuModal";
import { OfflineBanner } from "@/components/OfflineBanner";
import { SpeakerToggleButton } from "@/components/SpeakerToggleButton";
import { COLORS } from "@/styles/themes";
import { Platform, View } from "react-native";
import EmergencyStackNav from "./main-tabs/emergency/EmergencyStackNav";
import LibraryStackNav from "./main-tabs/library/LibraryStackNav";
import MyCollectionStackNav from "./main-tabs/my-collection/MyCollectionStackNav";

import { MaterialIcons } from "@expo/vector-icons";

import { screenOptions } from "./MainTab.style";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

const MainTabs = createBottomTabNavigator();

export default function MainTabNav() {
  const { isError } = useSyncEngine();
  const { isInConsultation } = useSession();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (isError) setBannerVisible(true);
  }, [isError]);

  return (
    <View style={{ flex: 1 }}>
      <MainTabs.Navigator
        screenOptions={{
          ...screenOptions,
          sceneStyle: { backgroundColor: COLORS.background },
          header: (props) => <GlobalHeader {...props} />,
        }}
        tabBar={(props) => (
          <>
            <OfflineBanner
              visible={bannerVisible}
              onClose={() => setBannerVisible(false)}
            />
            <BottomTabBar {...props} />
          </>
        )}
      >
        <MainTabs.Screen
          name="CommBoardStackNav"
          component={CommBoardStackNavigator}
          options={{
            title: "Prancha Livre",
            headerRight: () =>
              isInConsultation ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 8,
                    gap: 8,
                  }}
                >
                  <SpeakerToggleButton />
                  <Appbar.Action
                    iconColor={COLORS.text.onPrimary}
                    icon={MORE_ICON}
                    onPress={() => setMenuVisible(true)}
                  />
                </View>
              ) : null,
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? "content-paste-search" : "content-paste-search"}
                size={size}
                color={color}
              />
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
              <Appbar.Action
                iconColor={COLORS.text.onPrimary}
                icon={MORE_ICON}
                onPress={() => setMenuVisible(true)}
              />
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? "content-paste" : "content-paste"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <MainTabs.Screen
          name="Emergency"
          component={EmergencyStackNav}
          options={{
            headerShown: false,
            title: "Emergência",
            headerRight: () => <></>,
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? "warning" : "warning"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <MainTabs.Screen
          name="Library"
          component={LibraryStackNav}
          options={{
            headerShown: false,
            title: "Biblioteca",
            headerRight: () => <></>,
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? "library-books" : "library-books"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <MainTabs.Screen
          name="Settings"
          component={SettingsStackNav}
          options={{
            title: "Configurações",
            headerRight: () => <></>,
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? "settings" : "settings"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </MainTabs.Navigator>

      <ConsultationMenuModal
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
}
