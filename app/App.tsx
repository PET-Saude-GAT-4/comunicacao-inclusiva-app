import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper"
import { StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
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
    )
}