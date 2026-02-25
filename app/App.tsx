import React from "react";
import { StatusBar } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootStackNavigator from "./navigation/RootStackNavigator.tsx";

export default function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar
          barStyle={theme.dark ? "light-content" : "dark-content"}
          backgroundColor={theme.colors.background}
        />
        <RootStackNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
