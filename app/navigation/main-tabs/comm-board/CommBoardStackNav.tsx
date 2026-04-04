import CommBoardScreen from "@/screens/main-tabs/comm-board/CommBoardScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function CommBoardStackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="placeholder" component={CommBoardScreen} />
    </Stack.Navigator>
  );
}
