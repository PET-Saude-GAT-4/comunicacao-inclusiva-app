import { Board } from "@/types/board.types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./BoardListComponent.style";

type Props = {
  boards: Board[];
  onBoardPress: (board: Board) => void;
};

export default function BoardListComponent({ boards, onBoardPress }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, boards]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 25 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar prancha..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredBoards}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onBoardPress(item)}>
            <View style={styles.boardBackground}>
              <Image
                source={{ uri: item.representativePictogram.imageSource }}
                style={styles.boardImage}
              />
              <View style={styles.divider} />
              <Text style={styles.boradTitle}>{item.title}</Text>
              <MaterialIcons name="arrow-forward-ios" size={25} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
