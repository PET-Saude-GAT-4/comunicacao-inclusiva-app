import React from "react";
import PrototypeWarningScreen from "../screens/PrototypeWarning";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const CommBoardStack = createNativeStackNavigator();

export default function CommBoardStackNavigator() {
    return (
        <CommBoardStack.Navigator>
            <CommBoardStack.Screen
                name='PrototypeWarning'
                component={PrototypeWarningScreen}
                options={{ headerShown: false }}
            />
        </CommBoardStack.Navigator>
    )
}