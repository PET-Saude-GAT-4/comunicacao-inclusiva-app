import { COLORS } from "@/styles/themes";
import { StyleSheet, View } from "react-native";

interface StepProgressBarProps {
  currentStep: 1 | 2 | 3;
}

export function StepProgressBar({ currentStep }: StepProgressBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stepsWrapper}>
        {/* Step 1 */}
        <View style={[styles.circle, currentStep >= 1 && styles.circleActive]} />
        
        {/* Linha 1 -> 2 */}
        <View style={[styles.line, currentStep >= 2 && styles.lineActive]} />
        
        {/* Step 2 */}
        <View style={[styles.circle, currentStep >= 2 && styles.circleActive]} />
        
        {/* Linha 2 -> 3 */}
        <View style={[styles.line, currentStep >= 3 && styles.lineActive]} />
        
        {/* Step 3 */}
        <View style={[styles.circle, currentStep >= 3 && styles.circleActive]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
    width: '100%',
  },
  stepsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.outlineCommon,
  },
  circleActive: {
    backgroundColor: COLORS.primaryDark,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.outlineCommon,
    marginHorizontal: 4,
  },
  lineActive: {
    backgroundColor: COLORS.primaryDark,
  },
});
