import { StepProgressBar } from "@/components/setup-consultation/StepProgressBar";
import { useProfessionHistory } from "@/hooks/useProfessionHistory";
import { useSession } from "@/hooks/useSession";
import { CommBoardStackParamList } from "@/navigation/types";
import { COLORS } from "@/styles/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "./ConfirmConsultationScreen.styles";

type Props = NativeStackScreenProps<
  CommBoardStackParamList,
  "ConfirmConsultationScreen"
>;

export default function ConfirmConsultationScreen({ route }: Props) {
  const { profession, speciality } = route.params;
  const { startConsultation } = useSession();
  const { addHistoryEntry } = useProfessionHistory();

  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();

  const handleConfirm = () => {
    // 1. Salva a dupla no histórico recente
    addHistoryEntry(profession, speciality);

    // 2. Inicia a sessão de atendimento
    startConsultation();

    // 3. Redireciona para o quadro de comunicação
    navigation.replace("CommBoardScreen");
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.container}>
        <StepProgressBar currentStep={3} />

        <View style={styles.header}>
          <Text style={styles.title}>Confirmar Atendimento</Text>
          <Text style={styles.subtitle}>
            Revise a área e especialidade selecionadas para iniciar o atendimento.
          </Text>
        </View>

        <View style={styles.summaryContainer}>
          {/* Card da Área / Profissão */}
          <View style={styles.summaryCard}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="account-tie"
                size={28}
                color={COLORS.primaryDark}
              />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardLabel}>Área de Atuação</Text>
              <Text style={styles.cardValue}>{profession.name}</Text>
            </View>
          </View>

          {/* Card da Especialidade */}
          <View style={styles.summaryCard}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="stethoscope"
                size={28}
                color={COLORS.primaryDark}
              />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardLabel}>Especialidade</Text>
              <Text style={styles.cardValue}>{speciality.name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.85}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Iniciar Atendimento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

