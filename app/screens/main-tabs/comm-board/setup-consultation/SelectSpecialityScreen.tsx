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
  const { specialities } = useSpecialities(profession.code);
  const [selectedSpeciality, setSelectedSpeciality] = useState<Speciality>();

  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();

  const defaultSpeciality: Speciality = {
    id: 0,
    name: "Não especificada",
    code: "GERAL",
    professionId: profession.id,
    createdAt: new Date().toISOString(),
    updatedAt: new  Date().toISOString(),
  };

  // if the list of specialities is empty
  const displaySpecialities =
    specialities && specialities.length > 0
      ? specialities
      : [defaultSpeciality];

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
            data={displaySpecialities}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <RadioOption
                label={item.name}
                selected={selectedSpeciality?.code === item.code}
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

