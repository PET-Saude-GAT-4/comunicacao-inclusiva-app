import { useMyCollection } from "@/hooks/useMyCollection";
import { COLORS } from "@/styles/themes";
import { Board } from "@/types/board.types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./BoardListComponent.style";
import { SearchBar } from "./SearchBar";

type Props = {
  boards: Board[];
  onBoardPress: (board: Board) => void;
  emptyMessage?: string;
  showSaveButton?: boolean;
};

export default function BoardListComponent({
  boards,
  onBoardPress,
  emptyMessage,
  showSaveButton = true,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { isSaved, toggleSaved } = useMyCollection();

  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, boards]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 25 }}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar prancha..."
        />
      </View>
      <FlatList
        data={filteredBoards}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.uuid}
        ListEmptyComponent={
          emptyMessage ? (
            <Text style={styles.emptyMessage}>{emptyMessage}</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onBoardPress(item)}>
            <View style={styles.boardBackground}>
              <Image
                source={{ uri: item.representativePictogram.imageSource }}
                style={styles.boardImage}
              />
              <View style={styles.divider} />
              <View style={styles.boardInfo}>
                <Text style={styles.boradTitle}>{item.title}</Text>
                <Text style={styles.pictogramCount}>
                  {item.pictogramCount}{" "}
                  {item.pictogramCount === 1 ? "pictograma" : "pictogramas"}
                </Text>
              </View>
              {showSaveButton && (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => toggleSaved(item.uuid)}
                >
                  <MaterialIcons
                    name={isSaved(item.uuid) ? "bookmark" : "bookmark-border"}
                    size={25}
                    color={
                      isSaved(item.uuid)
                        ? COLORS.primaryDark
                        : COLORS.text.onPrimaryVariant
                    }
                  />
                </TouchableOpacity>
              )}
              <MaterialIcons name="arrow-forward-ios" size={25} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
