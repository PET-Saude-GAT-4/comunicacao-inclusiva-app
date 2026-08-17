import GlobalHeader from "@/components/GlobalHeaderComponent";
import { MyCollectionStackParamList } from "@/navigation/types";
import BoardDetailScreen from "@/screens/main-tabs/my-collection/BoardDetailScreen";
import { COLORS } from "@/styles/themes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";
import BoardCollectionTabNav from "./BoardCollectionTabNav";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export default function MyCollectionStackNav() {
  const Stack = createNativeStackNavigator<MyCollectionStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <GlobalHeader {...props} /> }}
    >
      <Stack.Screen
        name="BoardCollectionTab"
        component={BoardCollectionTabNav}
        options={{
          title: "Minha Coleção",
          headerRight: () => (
            <Appbar.Action
              iconColor={COLORS.text.onPrimary}
              icon={MORE_ICON}
              onPress={() => {}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="BoardDetails"
        component={BoardDetailScreen}
        options={{ title: "Detalhes da Prancha" }}
      />
    </Stack.Navigator>
  );
}
