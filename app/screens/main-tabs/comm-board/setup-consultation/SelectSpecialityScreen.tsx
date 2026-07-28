import { RadioOption } from "@/components/setup-consultation/RadioOption";
import { StepProgressBar } from "@/components/setup-consultation/StepProgressBar";
import { useSpecialities } from "@/hooks/useSpecialities";
import { CommBoardStackParamList } from "@/navigation/types";
import { Speciality } from "@/types/speciality.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "./SelectSpecialityScreen.styles";

type Props = NativeStackScreenProps<CommBoardStackParamList, "SelectSpecialityScreen">;

export default function SelectSpecialityScreen({ route }: Props) {
  const { profession } = route.params;
  const { specialities } = useSpecialities(profession.id);
  const [selectedSpeciality, setSelectedSpeciality] = useState<Speciality>();

  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.container}>
        <StepProgressBar currentStep={2} />

        <View style={styles.header}>
          <Text style={styles.title}>Selecione a Especialidade</Text>
          <Text style={styles.subtitle}>
            Escolha sua especialidade para este atendimento
          </Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={specialities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RadioOption
                label={item.name}
                selected={selectedSpeciality?.id === item.id}
                onSelect={() => setSelectedSpeciality(item)}
              />
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedSpeciality && styles.nextButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!selectedSpeciality}
            onPress={() => {
              if (selectedSpeciality) {
                navigation.navigate("ConfirmConsultationScreen", {
                  profession,
                  speciality: selectedSpeciality,
                });
              }
            }}
          >
            <Text style={styles.nextButtonText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

