import { BoardSkeleton } from "@/components/BoardSkeleton";
import { usePreferences } from "@/hooks/usePreferences";
import { usePhrases } from "@/hooks/usePhrases";
import { LibraryPhraseStackParamList } from "@/navigation/types";
import { useMyCollection } from "@/hooks/useMyCollection";
import { Phrase } from "@/types/phrase.types";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/styles/themes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./PhrasesScreen.styles";

type NavProp = NativeStackNavigationProp<
  LibraryPhraseStackParamList,
  "PublicPhraseDetails"
>;

export default function PhrasesScreen() {
  const navigation = useNavigation<NavProp>();
  const { phrases, isLoading } = usePhrases();
  const { displayMode } = usePreferences();
  const { isSaved, toggleSaved } = useMyCollection();

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
        data={phrases}
        keyExtractor={(item) => item.uuid}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhuma frase disponível no momento.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("PublicPhraseDetails", { phrase: item })
            }
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
