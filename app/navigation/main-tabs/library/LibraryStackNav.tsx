import GlobalHeader from "@/components/GlobalHeaderComponent";
import { COLORS } from "@/styles/themes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { Appbar } from "react-native-paper";
import { LibraryBoardStackParamList } from "./../../types";
import LibraryTabNav from "./LibraryTabNav";
import BoardDetailScreen from "@/screens/main-tabs/my-collection/BoardDetailScreen";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

export default function LibraryStackNav() {
  const Stack = createNativeStackNavigator<LibraryBoardStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <GlobalHeader {...props} /> }}
    >
      <Stack.Screen
        name="LibraryTab"
        component={LibraryTabNav}
        options={{
          title: "Biblioteca",
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
        name="PublicBoardDetails"
        component={BoardDetailScreen}
        options={{ title: "Detalhes da Prancha" }}
      />
    </Stack.Navigator>
  );
}
