import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <></>
            </PaperProvider>
        </SafeAreaProvider>
    )
}