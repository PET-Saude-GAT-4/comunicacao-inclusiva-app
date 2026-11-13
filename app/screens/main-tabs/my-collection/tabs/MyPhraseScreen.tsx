import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { BoardSkeleton } from "@/components/BoardSkeleton";
import { PhraseCard } from "@/components/PhraseCard";
import { styles as phraseCardStyles } from "@/components/PhraseCard.styles";
import { SearchBar } from "@/components/SearchBar";
import { useHotBarInset } from "@/hooks/useHotBarInset";
import { useMyCollection } from "@/hooks/useMyCollection";
import { usePhrases } from "@/hooks/usePhrases";
import { useSession } from "@/hooks/useSession";
import { styles } from "@/screens/main-tabs/library/PhrasesScreen.styles";
import { MainTabParamList } from "@/navigation/types";
import { Phrase } from "@/types/phrase.types";

export default function MyPhraseScreen() {
  const hotBarInset = useHotBarInset();
  const [searchQuery, setSearchQuery] = useState("");
  const { listedPhrases, isLoading } = usePhrases();
  const { savedUuids } = useMyCollection();
  const { isInConsultation } = useSession();
  const navigation = useNavigation<NavigationProp<MainTabParamList>>();

  const handleUsePhrase = (phrase: Phrase) => {
    if (!isInConsultation) {
      navigation.navigate("CommBoardStackNav", {
        screen: "NoConsultationScreen",
        params: { showPhrasePrompt: true },
      });
      return;
    }

    navigation.navigate("CommBoardStackNav", {
      screen: "CommBoardScreen",
      params: { initialTerms: phrase.terms, triggerPhraseUuid: phrase.uuid },
    });
  };

  // Starting from the listed phrases rather than from every cached one: a
  // phrase can be saved while listed and unlisted afterwards, and the saved set
  // keeps it either way.
  const savedPhrases = useMemo(() => {
    return listedPhrases
      .filter((phrase) => savedUuids.includes(phrase.uuid))
      .filter((phrase) =>
        phrase.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
  }, [listedPhrases, savedUuids, searchQuery]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <BoardSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Busque uma frase pronta..."
        />
      </View>
      <FlatList
        data={savedPhrases}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: hotBarInset },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma interação salva encontrada.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <PhraseCard
            phrase={item}
            actionElement={
              <TouchableOpacity
                style={phraseCardStyles.iconButton}
                activeOpacity={0.7}
                onPress={() => handleUsePhrase(item)}
              >
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="#6F7976"
                  style={{ marginLeft: 2 }}
                />
              </TouchableOpacity>
            }
          />
        )}
      />
    </View>
  );
}
