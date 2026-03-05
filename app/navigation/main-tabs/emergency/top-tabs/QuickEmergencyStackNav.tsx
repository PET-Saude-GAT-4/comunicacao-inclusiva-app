import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Placeholder = () => {
  return (
    <SafeAreaView>
      <Text>this is a placeholder</Text>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

export default function QuickEmergencyStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="placeholder" component={Placeholder} />
    </Stack.Navigator>
  );
}
