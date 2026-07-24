import GlobalHeader from "@/components/GlobalHeaderComponent";
import ModuleVisualizationScreen from "@/screens/main-tabs/emergency/ModuleVisualizationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";
import EmergencyTabNav from "./EmergencyTabNav";
import { EmergencyStackParamList } from "./../../types";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export default function EmergencyStackNav() {
  const Stack = createNativeStackNavigator<EmergencyStackParamList>();
  
  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <GlobalHeader {...props} /> }}
    >
      <Stack.Screen
        name="EmergencyTab"
        component={EmergencyTabNav}
        options={{
          title: "Emergência",
          headerRight: () => (
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
          ),
        }}
      />
      <Stack.Screen
        name="ModuleVisualization"
        component={ModuleVisualizationScreen}
        options={{ title: "Visualização do Módulo" }}
      />
    </Stack.Navigator>
  );
}
