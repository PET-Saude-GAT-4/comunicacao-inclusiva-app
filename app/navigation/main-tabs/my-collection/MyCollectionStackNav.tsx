import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BoardStackNav from "./tabs/BoardStackNav";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoardCollectionTabNav from "./BoardCollectionTabNav";
import BoardDetailScreen from "@/screens/main-tabs/my-collection/BoardDetailScreen";
import { MyCollectionStackParamList } from "@/navigation/types";
import GlobalHeader from "@/components/GlobalHeaderComponent";
import { Appbar } from "react-native-paper";
import { Platform } from "react-native";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export default function MyCollectionStackNav(){
const Stack = createNativeStackNavigator<MyCollectionStackParamList>();

  return(
    <Stack.Navigator screenOptions={{ header: (props) => <GlobalHeader {...props} /> }}>
      <Stack.Screen
        name="BoardCollectionTab"
        component={BoardCollectionTabNav}
        options={{ 
          title: "Minha Coleção",
          headerRight: () => <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> 
        }}
      />
      <Stack.Screen
        name="BoardDetails"
        component={BoardDetailScreen}
        options={{ title: "Detalhes da Prancha" }}
      />
      <Stack.Screen
        name="PhraseDetails"
        component={require("@/screens/main-tabs/library/PhraseDetailScreen").default}
        options={{ title: "Detalhes da Interação" }}
      />
    </Stack.Navigator>
  )
}