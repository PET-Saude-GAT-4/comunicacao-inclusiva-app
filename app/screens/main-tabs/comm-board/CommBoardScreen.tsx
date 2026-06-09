import { BoardSkeleton } from "@/components/BoardSkeleton";
import { useBoardPictogram } from "@/hooks/useBoardPictograms";
import { useBoards } from "@/hooks/useBoards";
import { useSession } from "@/hooks/useSession";
import { COLORS } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Pictogram } from "../../../types/pictogram.types";
import { styles } from "./CommBoardScreen.styles";

export default function CommBoardScreen() {
  const { currentSpeaker, startConsultation } = useSession();
  const handleStartConsultation = () => {
    startConsultation();
  };
  //save the selected pictogram sequence
  const [selectedPictograms, setSelectedPictograms] = useState<Pictogram[]>([]);
  const [selectedBoardUuid, setSelectedBoardUuid] = useState<string | null>(
    null,
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { boards, isLoading: isLoadingBoards } = useBoards();
  const { pictograms, isLoading: isLoadingPics } = useBoardPictogram(
    selectedBoardUuid || "",
  );

  useEffect(() => {
    if (boards.length > 0 && !selectedBoardUuid) {
      setSelectedBoardUuid(boards[0].uuid);
    }
  }, [boards]);

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
    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, boards]);

  return (
    <View style={styles.container}>
      {/* OfflineBanner is now driven by the global SyncEngine in MainTabNav */}
      <View style={styles.visorContainer}>
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.text,
              {
                color:
                  currentSpeaker === "professional"
                    ? COLORS.primaryDark
                    : COLORS.secondary,
              },
            ]}
          >
            {currentSpeaker === "professional"
              ? "Interação do profissional"
              : "Interação do paciente"}
          </Text>
          {currentSpeaker === "professional" && (
            <TouchableOpacity
              style={styles.startConsultationButton}
              onPress={handleStartConsultation}
              activeOpacity={0.7}
            >
              <Text style={styles.startConsultationButtonText}>
                Iniciar Consulta
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.listSelectedPictograms}>
          {/* Scroll view to list all selected pictograms  */}
          <ScrollView horizontal={true}>
            {selectedPictograms.map((pictogram, index) => (
              <View
                key={`${pictogram.uuid}-${index}`}
                style={styles.selectedPictogramDiv}
              >
                <Image
                  source={{ uri: pictogram.imageSource }}
                  style={styles.selectedPictogramImage}
                />
                <Text style={styles.pictogramText} numberOfLines={1}>
                  {pictogram.description.toUpperCase()}
                </Text>
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
              const isSelected = board.uuid === selectedBoardUuid;
              return (
                <TouchableOpacity
                  key={board.uuid}
                  onPress={() => setSelectedBoardUuid(board.uuid)}
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
                      {board.representativePictogram && (
                        <Image
                          source={{
                            uri: board.representativePictogram.imageSource,
                          }}
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
          {isLoadingPics ? (
            <BoardSkeleton />
          ) : (
            <FlatList
              numColumns={4}
              showsVerticalScrollIndicator={false}
              data={pictograms}
              keyExtractor={(item) => item.uuid}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <View style={styles.pictogramDiv}>
                    <Image
                      source={{ uri: item.imageSource }}
                      style={styles.pictogramImage}
                    />
                    <Text style={styles.pictogramText} numberOfLines={1}>
                      {item.description.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
