import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "./MainTabNav";

const RootStack = createNativeStackNavigator();

/* 
        As root, it gathers globally accessible navigators, in this case, if user is logged in,
    they will be sent to the MainTabNavigator, otherwise they will be prompted to
    authenticate as they are sent to the AuthStackNavigator.
*/
export default function RootStackNav() {
  const { user, isLoading } = { user: true, isLoading: false };

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="MainTabNav"
        component={MainTabNavigator}
        options={{}}
      />
    </RootStack.Navigator>
  );
}
