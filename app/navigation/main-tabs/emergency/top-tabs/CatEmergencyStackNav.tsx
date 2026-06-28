import { CatEmergencyScreen } from "@/screens/main-tabs/emergency/tabs/CatEmergencyScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export default function CatEmergencyStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={CatEmergencyScreen} />
    </Stack.Navigator>
  );
}
