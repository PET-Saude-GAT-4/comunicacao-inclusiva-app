import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = createMaterialTopTabNavigator();

export default function LibraryTabNav() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen
                name="Library-Board"
                component={() => <></>}
                options={{ title: "Biblioteca" }}
            />
            <TopTabs.Screen
                name="Library-Interactions"
                component={() => <></>}
                options={{ title: "Interações" }}
            />
            <TopTabs.Screen
                name="Library-Emergency-Modules"
                component={() => <></>}
                options={{ title: "Módulos de Emergência" }}
            />
        </TopTabs.Navigator>
    );
}