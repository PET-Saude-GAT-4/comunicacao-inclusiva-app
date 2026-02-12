import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";

const Placeholder = () => {
    return (
        <View style={{flex:1}}>
            <Text>
                LOGIN PAGE!!
            </Text>
        </View>
    )
}

const AuthStack = createNativeStackNavigator();

/* 
        This navigator leads into login, register and other authentication related
    screens to be built. 
*/
export default function AuthStackNavigator() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name='Placeholder'
                component={Placeholder}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    )
}