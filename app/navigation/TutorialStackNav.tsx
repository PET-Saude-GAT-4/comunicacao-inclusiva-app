import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainTabNavigator from "./MainTabNav";

const Stack = createNativeStackNavigator();

/* 
        As root, it gathers globally accessible navigators, in this case, if user is logged in,
    they will be sent to the MainTabNavigator, otherwise they will be prompted to
    authenticate as they are sent to the AuthStackNavigator.
*/
export default function TutorialStackNav() {
  const { user, isLoading } = { user: true, isLoading: false };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainTabNav"
        component={MainTabNavigator}
        options={{}}
      />      
    </Stack.Navigator>
  );
}
