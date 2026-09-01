import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { BoardSkeleton } from "@/components/BoardSkeleton";
import { PainScaleTray } from "@/components/pain-scale/PainScaleTray";
import { SearchBar } from "@/components/SearchBar";
import { PainScaleTrigger } from "@/components/pain-scale/PainScaleTrigger";
import type { PainScaleSubmission } from "@/components/pain-scale/types";
import { usePreferences } from "@/hooks/usePreferences";
import { useBoardTerms } from "@/hooks/useBoardTerms";
import { useBoards } from "@/hooks/useBoards";
import { useSession } from "@/hooks/useSession";
import { CommBoardStackParamList } from "@/navigation/types";
import { COLORS } from "@/styles/themes";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
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
import { styles } from "./CommBoardScreen.styles";

export default function CommBoardScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();
  const route =
    useRoute<RouteProp<CommBoardStackParamList, "CommBoardScreen">>();

  const { currentSpeaker, isInConsultation, setCurrentSpeaker } = useSession();
  const { displayMode } = usePreferences();

  // Redirect to NoConsultationScreen when consultation ends
  useEffect(() => {
    if (!isInConsultation) {
      navigation.replace("NoConsultationScreen");
    }
  }, [isInConsultation]);

  const [isTextMode, setIsTextMode] = useState(false);
  const [typedText, setTypedText] = useState("");
  // save the selected term sequence
  const [selectedTerms, setSelectedTerms] = useState<Term[]>([]);
  const [selectedBoardUuid, setSelectedBoardUuid] = useState<string | null>(
    null,
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPainScaleVisible, setIsPainScaleVisible] = useState(false);

  // Load pre-filled terms from a ready-made phrase
  useEffect(() => {
    const incoming = route.params?.initialTerms;
    if (incoming && incoming.length > 0) {
      setSelectedTerms(incoming);
      navigation.setParams({ initialTerms: undefined });
    }
  }, [route.params?.initialTerms]);

  // TODO: record the intensity through SessionContext once an interaction type
  // exists for it.
  const handlePainScaleSubmit = async (submission: PainScaleSubmission) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("Intensidade enviada:", submission);
  };

  const { boards, isLoading: isLoadingBoards } = useBoards();
  const { terms, isLoading: isLoadingTerms } = useBoardTerms(
    selectedBoardUuid || "",
  );

  useEffect(() => {
    if (boards.length > 0 && !selectedBoardUuid) {
      setSelectedBoardUuid(boards[0].uuid);
    }
  }, [boards]);

  // add terms to the visor list
  const handleSelect = (term: Term) => {
    setSelectedTerms((prev) => [...prev, term]);
  };

  const handleDeleteLast = () => {
    setSelectedTerms((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setSelectedTerms([]);
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
          {/* Visor: scroll list of selected terms */}
          <ScrollView horizontal={true}>
            {selectedTerms.map((term, index) => {
              const display = resolveTermDisplay(term, displayMode);
              return (
                <View
                  key={`${term.pictogram.uuid}-${index}`}
                  style={styles.selectedPictogramDiv}
                >
                  <Image
                    source={{ uri: display.imageSource }}
                    style={styles.selectedPictogramImage}
                  />
                  <Text style={styles.pictogramText} numberOfLines={1}>
                    {display.label}
                  </Text>
                </View>
              );
            })}
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
                  terms: [],
                  textContent: typedText.trim(),
                  senderSpeaker: currentSpeaker,
                  displayMode,
                });
              } else {
                if (selectedTerms.length === 0) return;

                if (!isInConsultation) {
                  setSelectedTerms([]);
                  console.log("Modo triagem: mensagem não registrada.");
                  return;
                }

                setSelectedTerms([]);

                setCurrentSpeaker(
                  currentSpeaker === "professional"
                    ? "patient"
                    : "professional",
                );

                navigation.navigate("FeedbackScreen", {
                  terms: selectedTerms,
                  senderSpeaker: currentSpeaker,
                  displayMode,
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
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar prancha..."
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
                      {/* Board cover always uses the representative pictogram, not a Term */}
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

        {/* FlatList — term grid */}
        <View style={{ flex: 1, paddingTop: 16 }}>
          {isLoadingTerms ? (
            <BoardSkeleton />
          ) : (
            <FlatList
              numColumns={4}
              showsVerticalScrollIndicator={false}
              data={terms}
              keyExtractor={(item) => item.pictogram.uuid}
              renderItem={({ item }) => {
                const display = resolveTermDisplay(item, displayMode);
                return (
                  <TouchableOpacity onPress={() => handleSelect(item)}>
                    <View style={styles.pictogramDiv}>
                      <Image
                        source={{ uri: display.imageSource }}
                        style={styles.pictogramImage}
                      />
                      <Text style={styles.pictogramText} numberOfLines={1}>
                        {display.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
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
