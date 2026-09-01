import { usePreferences } from "@/hooks/usePreferences";
import { Phrase } from "@/types/phrase.types";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./PhraseCard.styles";

type Props = {
  phrase: Phrase;
  actionElement?: React.ReactNode;
};

export function PhraseCard({ phrase, actionElement }: Props) {
  const { displayMode } = usePreferences();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{phrase.description}</Text>

      <View style={styles.divider} />

      <View style={styles.contentRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pictogramsContainer}
        >
          {phrase.terms.map((term: Term, index: number) => {
            const display = resolveTermDisplay(term, displayMode);
            return (
              <View
                key={`${term.pictogram.uuid}-${index}`}
                style={styles.pictogramItem}
              >
                <Image
                  source={{ uri: display.imageSource }}
                  style={styles.pictogramImage}
                />
                <Text style={styles.pictogramLabel} numberOfLines={1}>
                  {display.label}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {actionElement && (
          <View style={styles.actionContainer}>{actionElement}</View>
        )}
      </View>
    </View>
  );
}
