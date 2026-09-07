import { QuickEmergencyStackParamList } from "@/navigation/types";
import { QuickEmergencyScreen } from "@/screens/main-tabs/emergency/tabs/QuickEmergency/QuickEmergencyScreen";
import { UrgencyResponseScreen } from "@/screens/main-tabs/emergency/tabs/QuickEmergency/UrgencyResponseScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<QuickEmergencyStackParamList>();

export default function QuickEmergencyStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuickEmergency" component={QuickEmergencyScreen} />
      <Stack.Screen name="UrgencyResponse" component={UrgencyResponseScreen} />
    </Stack.Navigator>
  );
}
