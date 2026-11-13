import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { LibraryPhraseStackParamList } from "@/navigation/types";
import PhrasesScreen from "@/screens/main-tabs/library/PhrasesScreen";

const Stack = createNativeStackNavigator<LibraryPhraseStackParamList>();

export default function PhraseLibStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PublicPhrases"
        component={PhrasesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
