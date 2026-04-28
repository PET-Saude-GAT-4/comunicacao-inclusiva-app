import { commBoardsMock } from "@/mocks/commBoardMock";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Pictogram } from "../../../types/pictogram.types";
import { styles } from "./CommBoardScreen.styles";

export default function CommBoardScreen() {
  //save the selected pictogram sequence
  const [selectedPictograms, setSelectedPictograms] = useState<Pictogram[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number>(
    commBoardsMock[0].id,
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //add pictograms to the list
  const handleSelect = (pictogram: Pictogram) => {
    setSelectedPictograms((prev) => [...prev, pictogram]);
  };

  const handleDeleteLast = () => {
    setSelectedPictograms((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setSelectedPictograms([]);
  };

  const filteredBoards = useMemo(() => {
    return commBoardsMock.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const currentBoardItems = useMemo(() => {
    const board = commBoardsMock.find((b) => b.id === selectedBoardId);
    return board ? board.items : [];
  }, [selectedBoardId]);

  return (
    <View style={styles.container}>
      <View style={styles.visorContainer}>
        <Text style={styles.text}>Personalize sua frase</Text>
        <View style={styles.listSelectedPictograms}>
          {/* Scroll view to list all selected pictograms  */}
          <ScrollView horizontal={true}>
            {selectedPictograms.map((pictogram, index) => (
              <View
                key={`${pictogram.id}-${index}`}
                style={styles.selectedPictrogramDiv}
              >
                <Image
                  source={pictogram.imageUrl}
                  style={styles.selectedPictrogramImage}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={handleDeleteLast}
            style={styles.deleteButton}
          >
            <Ionicons name="backspace-outline" size={32} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Send pictograms:", selectedPictograms)}
            style={styles.sendButton}
          >
            <Ionicons name="send-outline" size={32} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.gridContainer}>
        {/* Categories Bar */}
        {isSearchActive && (
          <View style={{ marginBottom: 16 }}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar prancha..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        )}
        <View style={styles.categoriesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {filteredBoards.map((board) => {
              const isSelected = board.id === selectedBoardId;
              return (
                <TouchableOpacity
                  key={board.id}
                  onPress={() => setSelectedBoardId(board.id)}
                >
                  <View
                    style={[
                      styles.categoryItem,
                      isSelected && styles.categoryItemSelected,
                    ]}
                  >
                    <LinearGradient
                      colors={["#5ce1e6", "#ffb8e4"]}
                      style={styles.categoryGradient}
                    >
                      {board.imageUrl && (
                        <Image
                          source={board.imageUrl}
                          style={styles.categoryImage}
                        />
                      )}
                      <Text style={styles.categoryText} numberOfLines={2}>
                        {board.title.toUpperCase()}
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.searchButtonContainer}
            onPress={() => {
              setIsSearchActive(!isSearchActive);
              setSearchQuery("");
            }}
          >
            <View style={styles.searchButton}>
              <Ionicons
                name={isSearchActive ? "close" : "search"}
                size={24}
                color="#666"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* FlatList to list all pictograms */}
        <View style={{ flex: 1, paddingTop: 16 }}>
          <FlatList
            numColumns={4}
            data={currentBoardItems}
            keyExtractor={(item) => item.pictogram.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item.pictogram)}>
                <View style={styles.pictrogramDiv}>
                  <Image
                    source={item.pictogram.imageUrl}
                    style={styles.pictrogramImage}
                  />
                </View>
              </TouchableOpacity>
            )}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      </View>
    </View>
  );
}
