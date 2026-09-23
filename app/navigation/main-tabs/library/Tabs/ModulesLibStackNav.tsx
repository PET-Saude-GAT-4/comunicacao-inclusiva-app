import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ModulesLibStackNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="placeholder"
                component={() => <></>}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}