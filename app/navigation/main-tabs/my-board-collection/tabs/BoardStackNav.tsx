import React from "react";

import MyBoardScreen from "@/screens/main-tabs/my-board-collection/tabs/MyBoardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function BoardStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="placeholder"
        component={MyBoardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
