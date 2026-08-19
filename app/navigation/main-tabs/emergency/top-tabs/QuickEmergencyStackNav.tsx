import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { QuickEmergencyScreen } from "@/screens/main-tabs/emergency/tabs/QuickEmergencyScreen";

const Stack = createNativeStackNavigator();

export default function QuickEmergencyStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuickEmergency" component={QuickEmergencyScreen} />
    </Stack.Navigator>
  );
}
