import { ProfessionHistory } from "@/components/ProfessionHistoryComponent";
import { RadioOption } from "@/components/setup-consultation/RadioOption";
import { StepProgressBar } from "@/components/setup-consultation/StepProgressBar";
import { useProfessions } from "@/hooks/useProfession";
import { CommBoardStackParamList } from "@/navigation/types";
import { Profession } from "@/types/Profession.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "./SelectProfessionScreen.styles";

export default function SelectProfessionScreen() {
  const { professions } = useProfessions();
  const [selectedProfession, setSelectedProfession] = useState<Profession>();

  const navigation =
    useNavigation<NativeStackNavigationProp<CommBoardStackParamList>>();

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.container}>
        <StepProgressBar currentStep={1} />

        <View style={styles.header}>
          <Text style={styles.title}>Selecione a Área</Text>
          <Text style={styles.subtitle}>
            Escolha sua área de atuação para este atendimento
          </Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={professions}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <RadioOption
                label={item.name}
                selected={selectedProfession?.code === item.code}
                onSelect={() => setSelectedProfession(item)}
              />
            )}
            contentContainerStyle={styles.flatListContent}
          />
          <ProfessionHistory professions={professions}/>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedProfession && styles.nextButtonDisabled,
            ]}
            activeOpacity={0.85}
            disabled={!selectedProfession}
            onPress={() => {
              if (selectedProfession) {
                // Passa a profissão inteira na rota
                navigation.navigate("SelectSpecialityScreen", {
                  profession: selectedProfession,
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
