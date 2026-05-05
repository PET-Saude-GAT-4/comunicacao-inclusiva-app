import React from "react";
import { StatusBar } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import RootStackNavigator from "./app/navigation/RootStackNav";

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={theme.dark ? "light-content" : "dark-content"}
            backgroundColor={theme.colors.background}
          />
          <RootStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
