import { usePreferences } from "@/hooks/usePreferences";
import { useSession } from "@/hooks/useSession";
import { RootStackParamList } from "@/navigation/types";
import { COLORS } from "@/styles/themes";
import { InteractionEntry } from "@/types/interaction.types";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./FeedbackScreen.styles";

export default function FeedbackScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "FeedbackScreen">>();
  const navigation = useNavigation();
  const { addInteraction, setCurrentSpeaker } = useSession();
  const { displayMode: currentDisplayMode } = usePreferences();

  const { terms, textContent, senderSpeaker, displayMode } = route.params;

  // Use the mode recorded at send time for rendering; fall back to current mode.
  const renderMode = displayMode ?? currentDisplayMode;

  const isTextMessage = !!textContent;

  // `type` and `content` have to be decided together: the entry is a
  // discriminated union, so a ternary on each field separately does not type.
  function buildEntry(understood: boolean): InteractionEntry {
    const base = {
      id: Date.now().toString(),
      speaker: senderSpeaker,
      timestamp: new Date().toISOString(),
      understood,
      displayMode: renderMode,
    };

    return isTextMessage
      ? { ...base, type: "text", content: textContent! }
      : { ...base, type: "term", content: terms };
  }

  const handleUnderstood = () => {
    addInteraction(buildEntry(true));

    console.log("Feedback: ENTENDI");
    navigation.goBack();
  };

  const handleDoubt = () => {
    addInteraction(buildEntry(false));

    // Revert speaker to the original sender so they can reformulate
    setCurrentSpeaker(senderSpeaker);

    console.log(
      "Feedback: TENHO DÚVIDA — speaker revertido para:",
      senderSpeaker,
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Speaker indication */}
      <Text
        style={[
          styles.speakerLabel,
          {
            color:
              senderSpeaker === "professional"
                ? COLORS.primaryDark
                : COLORS.secondary,
          },
        ]}
      >
        {senderSpeaker === "professional"
          ? "Interação do profissional"
          : "Interação do paciente"}
      </Text>

      {/* Read-only visor */}
      <View style={styles.visor}>
        {isTextMessage ? (
          <Text style={styles.visorTextContent}>{textContent}</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.visorScrollContent}
          >
            {terms.map((term: Term, index: number) => {
              const display = resolveTermDisplay(term, renderMode);
              return (
                <View
                  key={`${term.pictogram.uuid}-${index}`}
                  style={styles.visorPictogramItem}
                >
                  <Image
                    source={{ uri: display.imageSource }}
                    style={styles.visorPictogramImage}
                  />
                  <Text style={styles.visorPictogramText} numberOfLines={1}>
                    {display.label}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* audio button */}
      <View style={styles.audioButtonContainer}>
        <View style={styles.audioButton}>
          <Ionicons name="volume-medium-outline" size={28} color="#666" />
        </View>
      </View>

      {/* Feedback buttons */}
      <View style={styles.buttonsContainer}>
        {/* ENTENDI */}
        <TouchableOpacity onPress={handleUnderstood} activeOpacity={0.7}>
          <View style={[styles.feedbackCard, styles.understoodCard]}>
            <Ionicons
              name="checkmark"
              size={56}
              color={COLORS.success}
              style={styles.feedbackIcon}
            />
            <Text style={styles.understoodText}>ENTENDI</Text>
          </View>
        </TouchableOpacity>

        {/* TENHO DÚVIDA */}
        <TouchableOpacity onPress={handleDoubt} activeOpacity={0.7}>
          <View style={[styles.feedbackCard, styles.doubtCard]}>
            <Ionicons
              name="help"
              size={56}
              color={COLORS.secondary}
              style={styles.feedbackIcon}
            />
            <Text style={styles.doubtText}>TENHO DÚVIDA</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
