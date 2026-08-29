import { usePreferences } from "@/hooks/usePreferences";
import { Phrase } from "@/types/phrase.types";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import { Image } from "expo-image";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { styles } from "./PhraseDetailScreen.styles";

type Props = {
  route: { params: { phrase: Phrase } };
};

export default function PhraseDetailScreen({ route }: Props) {
  const { phrase } = route.params;
  const { displayMode } = usePreferences();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.phraseTitle}>{phrase.description}</Text>
      </View>

      <FlatList
        data={phrase.terms}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item: Term, index: number) =>
          `${item.pictogram.uuid}-${index}`
        }
        renderItem={({ item }: { item: Term }) => {
          const display = resolveTermDisplay(item, displayMode);
          return (
            <View style={styles.pictogramDiv}>
              <Image
                source={{ uri: display.imageSource }}
                style={styles.pictogramImg}
              />
              <Text style={styles.pictogramText} numberOfLines={1}>
                {display.label}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
