import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen/LoginScreen";

const AuthStack = createNativeStackNavigator();

/* 
        This navigator leads into login, register and other authentication related
    screens to be built. 
*/
export default function AuthStackNav() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
