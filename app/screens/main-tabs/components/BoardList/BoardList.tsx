import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {CONTAINERS, TYPOGRAPHY, COLORS} from "@/styles/themes";
import { Pictogram } from "@/types/pictogram.types";

type Board = {
  uuid: string;
  title: string;
  representativePictogram: Pictogram;
}

type BoardListProps = {
  filteredBoards: Board[];
  onBoardPress: (board: Board) => void;
  keyExtractor?: (item: Board) => string;
  renderListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
}

export default function BoardList({
    filteredBoards,
    onBoardPress,
    keyExtractor = (item: Board) => item.uuid,
    renderListEmptyComponent
} : BoardListProps) {


  return (
      <>
        <FlatList
          data={filteredBoards}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onBoardPress(item)}
            >
              <View style={styles.boardBackground}>
                <Image
                  source={{ uri: item.representativePictogram.imageSource }}
                  style={styles.boardImage}
                />
                <View style={styles.divider} />
                <Text style={styles.boardTitle}>{item.title}</Text>
                <MaterialIcons name="arrow-forward-ios" size={25} color="#000" />
              </View>
            </TouchableOpacity>
          )}
          />
          </>
  );
}

export const styles = StyleSheet.create({
  boardImage: {
    width: 80, 
    height: 80,
    borderRadius: 0,
  },
  divider: {
    width: 2,
    height: 80,
    backgroundColor: COLORS.outlineCommon,
    marginHorizontal: 8,
  },
  boardTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: 700,
  },
    boardBackground: {
    backgroundColor: COLORS.surface.secondary,
    height: 100,
    borderRadius: CONTAINERS.radius.lg,                          // No constant for 20
    justifyContent: "center",
    alignItems: "center",
    marginBottom: CONTAINERS.spacings.md,      // 16
    padding: 20,                               // No constant for 20
    flexDirection: "row",
  },
});
