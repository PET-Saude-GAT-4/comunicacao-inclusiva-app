import { useEmergency } from "@/hooks/useEmergency";
import { useModuleBoardPictogram } from "@/hooks/useModulePictograms";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { Pictogram } from "@/types/pictogram.types";
import { Image } from "expo-image";
import { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ModuleVisualizationScreen from "../ModuleVisualizationScreen";

export function QuickEmergencyScreen() {
  const searchQuery = "module";

  const { boards } = useEmergency();

  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.uuid.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, boards]);

  const board = filteredBoards.find((item) => item.uuid === "module-board-8");

  const { pictograms } = useModuleBoardPictogram(board?.uuid || "");

  function onTap(pictogram: Pictogram) {
    console.log(pictogram.description);
  }

  return (
    <View style={{flex: 1}}>
      {board && <ModuleVisualizationScreen board={board} />}
    </View>
  );
}

