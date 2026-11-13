import { MaterialIcons } from "@expo/vector-icons";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { Appbar } from "react-native-paper";

import { ConsultationMenuModal } from "@/components/ConsultationMenuModal";
import GlobalHeader from "@/components/GlobalHeaderComponent";
import { OfflineBanner } from "@/components/OfflineBanner";
import { SpeakerToggleButton } from "@/components/SpeakerToggleButton";
import { useSession } from "@/hooks/useSession";
import { useSyncEngine } from "@/hooks/useSyncEngine";
import { COLORS } from "@/styles/themes";

import CommBoardStackNavigator from "./main-tabs/comm-board/CommBoardStackNav";
import EmergencyStackNav from "./main-tabs/emergency/EmergencyStackNav";
import LibraryStackNav from "./main-tabs/library/LibraryStackNav";
import MyCollectionStackNav from "./main-tabs/my-collection/MyCollectionStackNav";
import SettingsStackNav from "./main-tabs/settings/SettingsStackNav";
import { HOT_BAR, screenOptions, styling } from "./MainTab.style";

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
          // Float the hot-bar above the system navigation bar / home
          // indicator instead of letting it stretch underneath it.
          <View
            pointerEvents="box-none"
            style={[
              styling.container,
              { bottom: props.insets.bottom + HOT_BAR.bottomGap },
            ]}
          >
            <OfflineBanner
              visible={bannerVisible}
              onClose={() => setBannerVisible(false)}
            />
            <BottomTabBar {...props} insets={{ ...props.insets, bottom: 0 }} />
          </View>
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
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="content-paste-search"
                size={HOT_BAR.iconSize}
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
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="content-paste"
                size={HOT_BAR.iconSize}
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
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="warning"
                size={HOT_BAR.iconSize}
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
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="library-books"
                size={HOT_BAR.iconSize}
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
            // Soft-excluded: still routable, but no longer shown in the hot-bar.
            tabBarItemStyle: { display: "none" },
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
