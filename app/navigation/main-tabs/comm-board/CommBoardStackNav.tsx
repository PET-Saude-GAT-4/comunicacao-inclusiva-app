import { useSession } from "@/hooks/useSession";
import CommBoardScreen from "@/screens/main-tabs/comm-board/CommBoardScreen";
import NoConsultationScreen from "@/screens/main-tabs/comm-board/NoConsultationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function CommBoardStackNav() {
  const { isInConsultation } = useSession();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isInConsultation ? "CommBoardScreen" : "NoConsultationScreen"}
    >
      <Stack.Screen name="NoConsultationScreen" component={NoConsultationScreen} />
      <Stack.Screen name="CommBoardScreen" component={CommBoardScreen} />
    </Stack.Navigator>
  );
}
