import { useSession } from "@/hooks/useSession";
import { COLORS } from "@/styles/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommBoardStackParamList } from "@/navigation/types";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./NoConsultationScreen.styles";

export default function NoConsultationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();
  const { startConsultation, currentSpeaker } = useSession();

  const isProfessional = currentSpeaker === "professional";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="doctor"
            size={96}
            color={COLORS.primaryDark}
          />
        </View>

        <Text style={styles.title}>Nenhum atendimento em andamento</Text>
        <Text style={styles.subtitle}>
          {isProfessional
            ? "Você precisa iniciar o atendimento para acessar a prancha livre."
            : "Aguarde o profissional iniciar o atendimento."}
        </Text>

        {isProfessional && (
          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.85}
            onPress={() => {
              startConsultation();
              navigation.replace("CommBoardScreen");
            }}
          >
            <Text style={styles.startButtonText}>Iniciar Atendimento</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
