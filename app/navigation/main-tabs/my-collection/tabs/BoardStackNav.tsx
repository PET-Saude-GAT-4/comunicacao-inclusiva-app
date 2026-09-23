import React from "react";

import { BoardStackParamList } from "@/navigation/types";
import MyBoardScreen from "@/screens/main-tabs/my-collection/tabs/MyBoardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<BoardStackParamList>();

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
