import { useEmergency } from "@/hooks/useEmergency";
import { ScrollIndicator } from "@/screens/main-tabs/components/ScrollIndicator/ScrollIndicator";
import { Board } from "@/types/board.types";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import ModuleVisualizationScreen from "../../ModuleVisualizationScreen";

export function QuickEmergencyScreen() {
  const searchQuery = "module-board-quick-emergency";
  const { boards } = useEmergency();

  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.uuid.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, boards]);

  const [activeIndex, setActiveIndex] = useState(0);

  function goToNext() {
    setActiveIndex((prev) => Math.min(prev + 1, filteredBoards.length - 1));
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

  const selectedBoard: Board | undefined = filteredBoards[activeIndex];

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ flex: 1 }}>
        {selectedBoard && <ModuleVisualizationScreen board={selectedBoard} />}
        <View style={styles.indicatorWrapper}>
          <ScrollIndicator
            count={filteredBoards.length}
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
