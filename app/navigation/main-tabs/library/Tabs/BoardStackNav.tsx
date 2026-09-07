import { LibraryBoardStackParamList } from "@/navigation/types";
import BoardDetailScreen from "@/screens/main-tabs/my-collection/BoardDetailScreen";
import PublicBoardsScreen from "@/screens/main-tabs/library/PublicBoardsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<LibraryBoardStackParamList>();

export default function BoardLibStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PublicBoards"
        component={PublicBoardsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
