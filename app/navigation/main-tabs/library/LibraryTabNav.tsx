import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BoardLibStackNav from "./Tabs/BoardStackNav";
import PhraseLibStackNav from "./Tabs/PhraseLibStackNav";

const TopTabs = createMaterialTopTabNavigator();

export default function LibraryTabNav() {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen
                name="Library-Board"
                component={BoardLibStackNav}
                options={{ title: "Biblioteca" }}
            />
            <TopTabs.Screen
                name="Library-Interactions"
                component={PhraseLibStackNav}
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