import SettingsScreen from "@/screens/main-tabs/settings/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export default function SettingsStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
