import { useEmergency } from "@/hooks/useEmergency";
import { Board } from "@/types/board.types";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import ModuleVisualizationScreen from "../ModuleVisualizationScreen";

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

  const SWIPE_THRESHOLD = 40; // px of vertical movement before it counts

  const panGesture = Gesture.Pan().onEnd((event) => {
    if (event.translationY < -SWIPE_THRESHOLD) {
      // dragged upward -> next board
      runOnJS(goToNext)();
    } else if (event.translationY > SWIPE_THRESHOLD) {
      // dragged downward -> previous board
      runOnJS(goToPrevious)();
    }
  });

  const selectedBoard: Board | undefined = filteredBoards[activeIndex];

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ flex: 1 }}>
        {selectedBoard && <ModuleVisualizationScreen board={selectedBoard} />}
      </View>
    </GestureDetector>
  );
}