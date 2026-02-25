import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStackNavigator from "./AuthStackNavigator";
import MainTabNavigator from "./MainTabNavigator";

const RootStack = createNativeStackNavigator();

/* 
        As root, it gathers globally accessible navigators, in this case, if user is logged in,
    they will be sent to the MainTabNavigator, otherwise they will be prompted to
    authenticate as they are sent to the AuthStackNavigator.
*/
export default function RootStackNavigator() {
  const { user, isLoading } = { user: false, isLoading: false };

  return (
    <RootStack.Navigator>
      {!user ? (
        <RootStack.Screen
          name="AuthNav"
          component={AuthStackNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <RootStack.Screen
          name="MainTabNav"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </RootStack.Navigator>
  );
}
