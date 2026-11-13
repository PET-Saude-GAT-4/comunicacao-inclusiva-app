import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Snackbar } from "react-native-paper";

import { useSession } from "@/hooks/useSession";
import { CommBoardStackParamList } from "@/navigation/types";
import { COLORS } from "@/styles/themes";

import { styles } from "./NoConsultationScreen.styles";

export default function NoConsultationScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();
  const route =
    useRoute<RouteProp<CommBoardStackParamList, "NoConsultationScreen">>();

  // The param is the prompt's state: it shows while the param is set, and
  // dismissing it clears the param so a return visit does not prompt again.
  const snackbarVisible = route.params?.showPhrasePrompt === true;

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
          Você precisa iniciar o atendimento para acessar a prancha livre.
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.85}
          onPress={() => {
            navigation.navigate("SelectProfessionScreen");
          }}
        >
          <Text style={styles.startButtonText}>Iniciar Atendimento</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => navigation.setParams({ showPhrasePrompt: undefined })}
        duration={2500}
      >
        Inicie um atendimento para usar frases prontas.
      </Snackbar>
    </View>
  );
}
