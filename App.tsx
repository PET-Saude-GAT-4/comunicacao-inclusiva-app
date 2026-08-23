import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MyCollectionProvider } from "./app/contexts/MyCollectionContext";
import { SessionProvider } from "./app/contexts/SessionContext";
import RootStackNavigator from "./app/navigation/RootStackNav";

export default function App() {
  const theme = useTheme();

  return (
    // Must be the outermost element — react-native-gesture-handler detectors
    // do not receive touches on Android without it.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <SessionProvider>
            <MyCollectionProvider>
              <NavigationContainer>
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
    </GestureHandlerRootView>
  );
}
