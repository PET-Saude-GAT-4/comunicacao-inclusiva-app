import GlobalHeader from "@/components/GlobalHeaderComponent";
import FeedbackScreen from "@/screens/main-tabs/comm-board/FeedbackScreen";
import ReportScreen from "@/screens/main-tabs/comm-board/ReportScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainTabNavigator from "./MainTabNav";
import TutorialStackNav from "./TutorialStackNav";

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
      <RootStack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          headerShown: true,
          title: "FeedBack",
          header: (props) => <GlobalHeader {...props} />,
        }}
      />
      <RootStack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          headerShown: true,
          title: "Relatório",
          header: (props) => <GlobalHeader {...props} />,
        }}
      />
      <RootStack.Screen
        name="TutorialStackNav"
        component={TutorialStackNav}
        options={{}}
      />
    </RootStack.Navigator>
  );
}
