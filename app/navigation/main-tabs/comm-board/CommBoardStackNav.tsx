import { useSession } from "@/hooks/useSession";
import CommBoardScreen from "@/screens/main-tabs/comm-board/CommBoardScreen";
import NoConsultationScreen from "@/screens/main-tabs/comm-board/NoConsultationScreen";
import ConfirmConsultationScreen from "@/screens/main-tabs/comm-board/setup-consultation/ConfirmConsultationScreen";
import SelectProfessionScreen from "@/screens/main-tabs/comm-board/setup-consultation/SelectProfessionScreen";
import SelectSpecialityScreen from "@/screens/main-tabs/comm-board/setup-consultation/SelectSpecialityScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function CommBoardStackNav() {
  const { isInConsultation } = useSession();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        isInConsultation ? "CommBoardScreen" : "NoConsultationScreen"
      }
    >
      <Stack.Screen
        name="NoConsultationScreen"
        component={NoConsultationScreen}
      />

      <Stack.Screen
        name="SelectProfessionScreen"
        component={SelectProfessionScreen}
      />
      <Stack.Screen
        name="SelectSpecialityScreen"
        component={SelectSpecialityScreen}
      />

      <Stack.Screen
        name="ConfirmConsultationScreen"
        component={ConfirmConsultationScreen}
      />

      <Stack.Screen name="CommBoardScreen" component={CommBoardScreen} />
    </Stack.Navigator>
  );
}
