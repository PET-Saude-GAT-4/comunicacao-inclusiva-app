import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { BoardSkeleton } from "@/components/BoardSkeleton";
import { PainScaleTray } from "@/components/pain-scale/PainScaleTray";
import { PainScaleTrigger } from "@/components/pain-scale/PainScaleTrigger";
import type { PainScaleSubmission } from "@/components/pain-scale/types";
import { useBoardPictogram } from "@/hooks/useBoardPictograms";
import { useBoards } from "@/hooks/useBoards";
import { useSession } from "@/hooks/useSession";
import { CommBoardStackParamList } from "@/navigation/types";
import { COLORS } from "@/styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();

  const { currentSpeaker, isInConsultation, setCurrentSpeaker } = useSession();
  // Redirect to NoConsultationScreen when consultation ends
  useEffect(() => {
    if (!isInConsultation) {
      navigation.replace("NoConsultationScreen");
    }
  }, [isInConsultation]);

  const [isTextMode, setIsTextMode] = useState(false);
  const [typedText, setTypedText] = useState("");
  //save the selected pictogram sequence
  const [selectedPictograms, setSelectedPictograms] = useState<Pictogram[]>([]);
  const [selectedBoardUuid, setSelectedBoardUuid] = useState<string | null>(
    null,
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPainScaleVisible, setIsPainScaleVisible] = useState(false);

  // TODO: record the intensity through SessionContext once an interaction type
  // exists for it.
  const handlePainScaleSubmit = async (submission: PainScaleSubmission) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("Intensidade enviada:", submission);
  };

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
            onPress={() => {
              if (isTextMode) {
                if (!typedText.trim()) return;

                if (!isInConsultation) {
                  setTypedText("");
                  console.log(
                    "Modo triagem: mensagem de texto não registrada.",
                  );
                  return;
                }

                setTypedText("");

                setCurrentSpeaker(
                  currentSpeaker === "professional"
                    ? "patient"
                    : "professional",
                );

                navigation.navigate("FeedbackScreen", {
                  pictograms: [],
                  textContent: typedText.trim(),
                  senderSpeaker: currentSpeaker,
                });
              } else {
                if (selectedPictograms.length === 0) return;

                if (!isInConsultation) {
                  setSelectedPictograms([]);
                  console.log("Modo triagem: mensagem não registrada.");
                  return;
                }

                setSelectedPictograms([]);

                setCurrentSpeaker(
                  currentSpeaker === "professional"
                    ? "patient"
                    : "professional",
                );

                navigation.navigate("FeedbackScreen", {
                  pictograms: selectedPictograms,
                  senderSpeaker: currentSpeaker,
                });
              }
            }}
            style={styles.sendButton}
          >
            <Ionicons name="send-outline" size={32} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.gridContainer}>
        {/* Text Mode Input */}
        {isTextMode && (
          <View style={{ marginBottom: 16 }}>
            <View style={styles.textModeInputContainer}>
              <TextInput
                style={styles.textModeInput}
                placeholder="Digite sua frase"
                value={typedText}
                onChangeText={setTypedText}
              />
              {typedText.length > 0 && (
                <TouchableOpacity
                  onPress={() => setTypedText("")}
                  style={styles.clearTextButton}
                >
                  <Ionicons name="close-circle" size={24} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

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
      <AccessibilityMenu
        isTextMode={isTextMode}
        onToggleTextMode={() => setIsTextMode(!isTextMode)}
      />
      {currentSpeaker === "patient" && (
        <PainScaleTrigger onPress={() => setIsPainScaleVisible(true)} />
      )}
      <PainScaleTray
        visible={isPainScaleVisible}
        onClose={() => setIsPainScaleVisible(false)}
        onSubmit={handlePainScaleSubmit}
      />
    </View>
  );
}
