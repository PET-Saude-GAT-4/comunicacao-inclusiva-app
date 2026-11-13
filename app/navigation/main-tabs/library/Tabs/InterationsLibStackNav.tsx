import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export default function InteractionsLibStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="placeholder"
        component={() => <></>}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
