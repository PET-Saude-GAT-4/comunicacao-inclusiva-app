import { useSession } from "@/hooks/useSession";
import { CommBoardStackParamList } from "@/navigation/types";
import { COLORS } from "@/styles/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { styles } from "./NoConsultationScreen.styles";

export default function NoConsultationScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();
  const route =
    useRoute<RouteProp<CommBoardStackParamList, "NoConsultationScreen">>();

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    if (route.params?.showPhrasePrompt) {
      setSnackbarVisible(true);
      navigation.setParams({ showPhrasePrompt: undefined });
    }
  }, [route.params?.showPhrasePrompt]);

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
        onDismiss={() => setSnackbarVisible(false)}
        duration={2500}
      >
        Inicie um atendimento para usar frases prontas.
      </Snackbar>
    </View>
  );
}
