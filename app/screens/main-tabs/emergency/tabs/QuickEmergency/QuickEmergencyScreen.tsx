import { useTriage } from "@/hooks/useTriage";
import { QuickEmergencyStackParamList } from "@/navigation/types";
import { ScrollIndicator } from "@/screens/main-tabs/components/ScrollIndicator/ScrollIndicator";
import { Board } from "@/types/board.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import ModuleVisualizationScreen from "../../ModuleVisualizationScreen";

export function QuickEmergencyScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        QuickEmergencyStackParamList,
        "QuickEmergency"
      >
    >();
  // One board per triage level, most urgent first.
  const { steps } = useTriage();
  const boards = steps.map((step) => step.board);

  const [activeIndex, setActiveIndex] = useState(0);

  function goToNext() {
    setActiveIndex((prev) => Math.min(prev + 1, boards.length - 1));
  }

  function goToPrevious() {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }

  const SWIPE_THRESHOLD = 40;

  const panGesture = Gesture.Pan().onEnd((event) => {
    if (event.translationY < -SWIPE_THRESHOLD) {
      runOnJS(goToNext)();
    } else if (event.translationY > SWIPE_THRESHOLD) {
      runOnJS(goToPrevious)();
    }
  });

  // The levels load after the first render, and the synced list can be shorter
  // than the bundled one, so the index is kept inside whatever is there now.
  const selectedBoard: Board | undefined =
    boards[Math.min(activeIndex, boards.length - 1)];

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ flex: 1 }}>
        {selectedBoard && (
          <ModuleVisualizationScreen
            board={selectedBoard}
            onPictogramPress={(pictogram) => {
              navigation.navigate("UrgencyResponse", { pictogram });
            }}
          />
        )}
        <View style={styles.indicatorWrapper}>
          <ScrollIndicator
            count={boards.length}
            activeIndex={activeIndex}
          />
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  indicatorWrapper: {
    position: "absolute",
    right: 8,
    top: "40%",
  },
});
