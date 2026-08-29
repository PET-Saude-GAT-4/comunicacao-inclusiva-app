import { BoardSkeleton } from "@/components/BoardSkeleton";
import { usePhrases } from "@/hooks/usePhrases";
import { useMyCollection } from "@/hooks/useMyCollection";
import { usePreferences } from "@/hooks/usePreferences";
import { MyCollectionStackParamList } from "@/navigation/types";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/styles/themes";
import React, { useMemo } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/screens/main-tabs/library/PhrasesScreen.styles";

type NavProp = NativeStackNavigationProp<
  MyCollectionStackParamList,
  "PhraseDetails"
>;

export default function MyPhraseScreen() {
  const navigation = useNavigation<NavProp>();
  const { phrases, isLoading } = usePhrases();
  const { displayMode } = usePreferences();
  const { savedUuids, isSaved, toggleSaved } = useMyCollection();

  const savedPhrases = useMemo(
    () => phrases.filter((phrase) => savedUuids.includes(phrase.uuid)),
    [phrases, savedUuids],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <BoardSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedPhrases}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma interação salva ainda.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("PhraseDetails", { phrase: item })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.description}</Text>
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
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.visorScrollContent}
            >
              {item.terms.map((term: Term, index: number) => {
                const display = resolveTermDisplay(term, displayMode);
                return (
                  <View
                    key={`${term.pictogram.uuid}-${index}`}
                    style={styles.termItem}
                  >
                    <Image
                      source={{ uri: display.imageSource }}
                      style={styles.termImage}
                    />
                    <Text style={styles.termText} numberOfLines={1}>
                      {display.label}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
