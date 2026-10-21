import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { useSession } from "@/hooks/useSession";
import { CommBoardStackParamList } from "@/navigation/types";
import CommBoardScreen from "@/screens/main-tabs/comm-board/CommBoardScreen";
import NoConsultationScreen from "@/screens/main-tabs/comm-board/NoConsultationScreen";
import ConfirmConsultationScreen from "@/screens/main-tabs/comm-board/setup-consultation/ConfirmConsultationScreen";
import SelectProfessionScreen from "@/screens/main-tabs/comm-board/setup-consultation/SelectProfessionScreen";
import SelectSpecialityScreen from "@/screens/main-tabs/comm-board/setup-consultation/SelectSpecialityScreen";

const Stack = createNativeStackNavigator<CommBoardStackParamList>();

export default function CommBoardStackNav() {
  const { isInConsultation } = useSession();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isInConsultation ? (
        <Stack.Screen name="CommBoardScreen" component={CommBoardScreen} />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}
