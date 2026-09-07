import { QuickEmergencyStackParamList } from "@/navigation/types";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { Pictogram } from "@/types/pictogram.types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type UrgencyRouteProp = RouteProp<
  QuickEmergencyStackParamList,
  "UrgencyResponse"
>;

type Props = {
  pictogram?: Pictogram;
  onPickAnotherSymptom?: () => void;
};

export function UrgencyResponseScreen({
  pictogram: propPictogram,
  onPickAnotherSymptom,
}: Props) {
  const navigation = useNavigation<any>();
  const route = useRoute<UrgencyRouteProp>();

  const pictogram = propPictogram ?? route.params?.pictogram;

  const handleBackToQuickEmergency = () => {
    if (onPickAnotherSymptom) {
      onPickAnotherSymptom();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("QuickEmergency");
    }
  };

  const handleGoToCommBoard = () => {
    navigation.navigate("CommBoardStackNav");
  };

  if (!pictogram) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Nenhum sintoma selecionado.</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleBackToQuickEmergency}
        >
          <Text style={styles.primaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sintoma Apontado</Text>

      <View style={styles.content}>
        <View style={styles.card}>
          <Image source={pictogram.imageSource} style={styles.image} />
          <Text style={styles.label} numberOfLines={2}>
            {pictogram.description.toUpperCase()}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleGoToCommBoard}
          >
            <MaterialIcons name="content-paste-search" size={24} color="#FFF" />
            <Text style={styles.primaryButtonText}>Ir para Prancha Livre</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={handleBackToQuickEmergency}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={22}
              color={COLORS.text.onPrimary}
            />
            <Text style={styles.secondaryButtonText}>
              Apontar outro sintoma
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default UrgencyResponseScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CONTAINERS.spacings.xl,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: CONTAINERS.spacings.xl,
    gap: CONTAINERS.spacings.md,
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.text.onPrimaryVariant,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.heading,
    fontWeight: "700",
    color: COLORS.text.onPrimary,
    marginBottom: CONTAINERS.spacings.md,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: CONTAINERS.spacings.xxl,
    marginTop: CONTAINERS.spacings.lg,
  },
  card: {
    flex: 1,
    maxHeight: 200,
    width: 200,
    borderRadius: CONTAINERS.radius.lg,
    backgroundColor: COLORS.surface.secondary,
    gap: CONTAINERS.spacings.lg,
    alignItems: "center",
    justifyContent: "center",
    padding: CONTAINERS.spacings.lg,
  },
  image: {
    width: "50%",
    height: "50%",
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.heading,
    fontWeight: "700",
    color: COLORS.text.onPrimary,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  actionsContainer: {
    gap: CONTAINERS.spacings.md,
    paddingBottom: CONTAINERS.spacings.lg,
    width: 300,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: CONTAINERS.spacings.sm,
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 16,
    borderRadius: CONTAINERS.radius.full,
  },
  primaryButtonText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "700",
    color: COLORS.text.onPrimaryDark,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: CONTAINERS.spacings.sm,
    backgroundColor: COLORS.surface.primary,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    paddingVertical: 16,
    borderRadius: CONTAINERS.radius.full,
  },
  secondaryButtonText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "600",
    color: COLORS.text.onPrimary,
  },
});
