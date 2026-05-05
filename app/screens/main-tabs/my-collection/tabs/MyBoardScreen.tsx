import { commBoardsMock } from "@/mocks/commBoardMock";

import { MyCollectionStackParamList } from "@/navigation/types";
import { Board } from "@/types/board.types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, TextInput } from "react-native";
import { styles } from "./MyBoardScreen.style";

export default function MyBoardScreen() {
  type NavProp = NativeStackNavigationProp<
    MyCollectionStackParamList,
    "BoardDetails"
  >;
  const navigation = useNavigation<NavProp>();

  const boards: Board[] = [...commBoardsMock];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("BoardDetails", { board: item })}
          >
            <View style={styles.boardBackground}>
              <Image source={item.imageUrl} style={styles.boardImage} />
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
