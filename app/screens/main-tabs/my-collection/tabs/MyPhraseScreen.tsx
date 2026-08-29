import { BoardSkeleton } from "@/components/BoardSkeleton";
import { PhraseCard } from "@/components/PhraseCard";
import { styles as phraseCardStyles } from "@/components/PhraseCard.styles";
import { SearchBar } from "@/components/SearchBar";
import { useMyCollection } from "@/hooks/useMyCollection";
import { usePhrases } from "@/hooks/usePhrases";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "@/screens/main-tabs/library/PhrasesScreen.styles";

export default function MyPhraseScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { phrases, isLoading } = usePhrases();
  const { savedUuids } = useMyCollection();

  const savedPhrases = useMemo(() => {
    return phrases
      .filter((phrase) => savedUuids.includes(phrase.uuid))
      .filter((phrase) =>
        phrase.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
  }, [phrases, savedUuids, searchQuery]);

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
        contentContainerStyle={styles.listContent}
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
              <View style={phraseCardStyles.iconButton}>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="#6F7976"
                  style={{ marginLeft: 2 }}
                />
              </View>
            }
          />
        )}
      />
    </View>
  );
}
