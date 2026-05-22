import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SessionProvider } from "./app/contexts/SessionContext";
import RootStackNavigator from "./app/navigation/RootStackNav";

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SessionProvider>
          <NavigationContainer>
            <StatusBar
              barStyle={theme.dark ? "light-content" : "dark-content"}
              backgroundColor={theme.colors.background}
            />
            <RootStackNavigator />
          </NavigationContainer>
        </SessionProvider>
      </PaperProvider >
    </SafeAreaProvider >
  );
}
