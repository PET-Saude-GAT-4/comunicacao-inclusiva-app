import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MyCollectionProvider } from "./app/contexts/MyCollectionContext";
import { SessionProvider } from "./app/contexts/SessionContext";
import RootStackNavigator from "./app/navigation/RootStackNav";
import { DefaultTheme } from "@react-navigation/native";
import { COLORS } from "./app/styles/themes"; 

const navTheme = DefaultTheme;
navTheme.colors.background = COLORS.background;

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SessionProvider>
          <MyCollectionProvider>
            <NavigationContainer
              theme={navTheme}
            >
              <StatusBar
                barStyle={theme.dark ? "light-content" : "dark-content"}
                backgroundColor={theme.colors.background}
              />
              <RootStackNavigator />
            </NavigationContainer>
          </MyCollectionProvider>
        </SessionProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
