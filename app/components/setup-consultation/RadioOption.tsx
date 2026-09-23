import { COLORS } from "@/styles/themes";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function RadioOption({ label, selected, onSelect }: RadioOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    borderRadius: 32, 
    marginBottom: 12,
  },
  containerSelected: {
    borderColor: COLORS.primaryDark,
    backgroundColor: COLORS.surface.primary,
  },
  label: {
    fontSize: 16,
    color: COLORS.text.onPrimary,
    fontWeight: "500",
  },
  labelSelected: {
    fontWeight: "700", 
    color: COLORS.primaryDark,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.outlineCommon,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: COLORS.primaryDark,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryDark,
  },
});
