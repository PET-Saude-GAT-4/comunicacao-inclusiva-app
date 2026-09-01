import { BoardSkeleton } from "@/components/BoardSkeleton";
import { PhraseCard } from "@/components/PhraseCard";
import { SearchBar } from "@/components/SearchBar";
import { useMyCollection } from "@/hooks/useMyCollection";
import { usePhrases } from "@/hooks/usePhrases";
import { COLORS } from "@/styles/themes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./PhrasesScreen.styles";

export default function PhrasesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { phrases, isLoading } = usePhrases();
  const { isSaved, toggleSaved } = useMyCollection();

  const filteredPhrases = useMemo(() => {
    return phrases.filter((phrase) =>
      phrase.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, phrases]);

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
        data={filteredPhrases}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma frase encontrada.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <PhraseCard
            phrase={item}
            actionElement={
              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.7}
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
            }
          />
        )}
      />
    </View>
  );
}
