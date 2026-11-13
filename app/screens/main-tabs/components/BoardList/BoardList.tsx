import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useHotBarInset } from "@/hooks/useHotBarInset";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { Pictogram } from "@/types/pictogram.types";

type Board = {
  uuid: string;
  title: string;
  representativePictogram: Pictogram;
};

type BoardListProps = {
  filteredBoards: Board[];
  onBoardPress: (board: Board) => void;
  keyExtractor?: (item: Board) => string;
  renderListEmptyComponent?: FlatListProps<Board>["ListEmptyComponent"];
};

export default function BoardList({
  filteredBoards,
  onBoardPress,
  keyExtractor = (item: Board) => item.uuid,
  renderListEmptyComponent,
}: BoardListProps) {
  const hotBarInset = useHotBarInset();

  return (
    <>
      <FlatList
        data={filteredBoards}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hotBarInset }}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onBoardPress(item)}>
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
    borderRadius: CONTAINERS.radius.lg, // No constant for 20
    justifyContent: "center",
    alignItems: "center",
    marginBottom: CONTAINERS.spacings.md, // 16
    padding: 20, // No constant for 20
    flexDirection: "row",
  },
});
