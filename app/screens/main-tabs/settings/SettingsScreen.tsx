import { usePreferences } from "@/hooks/usePreferences";
import { COLORS } from "@/styles/themes";
import React from "react";
import { Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { styles } from "./SettingsScreen.styles";

export default function SettingsScreen() {
  const { displayMode, toggleDisplayMode } = usePreferences();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Modo Libras</Text>
            <Text style={styles.settingDescription}>
              Exibir o modo de visualização SignWriting.
            </Text>
          </View>
          <Switch
            value={displayMode === "signWriting"}
            onValueChange={toggleDisplayMode}
            color={COLORS.primary}
          />
        </View>
      </View>
    </View>
  );
}
