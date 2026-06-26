import { RootStackParamList } from "@/navigation/types";
import { useSession } from "@/hooks/useSession";
import { COLORS } from "@/styles/themes";
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

  const { pictograms, textContent, senderSpeaker } = route.params;

  const isTextMessage = !!textContent;

  const handleUnderstood = () => {
    // Register the interaction as successful communication
    addInteraction({
      id: Date.now().toString(),
      speaker: senderSpeaker,
      type: isTextMessage ? "text" : "pictogram",
      content: isTextMessage
        ? textContent!
        : pictograms,
      timestamp: new Date().toISOString(),
      understood: true,
    });

    console.log("Feedback: ENTENDI");
    navigation.goBack();
  };

  const handleDoubt = () => {
    // Register the interaction as confusion
    addInteraction({
      id: Date.now().toString(),
      speaker: senderSpeaker,
      type: isTextMessage ? "text" : "pictogram",
      content: isTextMessage
        ? textContent!
        : pictograms,
      timestamp: new Date().toISOString(),
      understood: false,
    });

    // Revert speaker to the original sender so they can reformulate
    setCurrentSpeaker(senderSpeaker);

    console.log("Feedback: TENHO DÚVIDA — speaker revertido para:", senderSpeaker);
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
            {pictograms.map((pictogram, index) => (
              <View
                key={`${pictogram.uuid}-${index}`}
                style={styles.visorPictogramItem}
              >
                <Image
                  source={{ uri: pictogram.imageSource }}
                  style={styles.visorPictogramImage}
                />
                <Text style={styles.visorPictogramText} numberOfLines={1}>
                  {pictogram.description.toUpperCase()}
                </Text>
              </View>
            ))}
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
