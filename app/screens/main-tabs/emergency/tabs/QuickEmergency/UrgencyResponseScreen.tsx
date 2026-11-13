import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useHotBarInset } from "@/hooks/useHotBarInset";
import { usePreferences } from "@/hooks/usePreferences";
import {
  EmergencyStackParamList,
  EmergencyTabParamList,
  MainTabParamList,
  QuickEmergencyStackParamList,
} from "@/navigation/types";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";

type UrgencyRouteProp = RouteProp<
  QuickEmergencyStackParamList,
  "UrgencyResponse"
>;

type Props = {
  term?: Term;
  onPickAnotherSymptom?: () => void;
};

export function UrgencyResponseScreen({
  term: propTerm,
  onPickAnotherSymptom,
}: Props) {
  const hotBarInset = useHotBarInset();
  // Typed after the deeper of its two mounts: QuickEmergencyStackNav, inside
  // the emergency top tabs, inside EmergencyStackNav, inside the main tabs.
  // EmergencyStackNav also mounts it directly, one level up the same chain.
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NavigationProp<QuickEmergencyStackParamList>,
        CompositeNavigationProp<
          NavigationProp<EmergencyTabParamList>,
          CompositeNavigationProp<
            NavigationProp<EmergencyStackParamList>,
            NavigationProp<MainTabParamList>
          >
        >
      >
    >();
  const route = useRoute<UrgencyRouteProp>();
  const { displayMode } = usePreferences();
  const isSignWriting = displayMode === "signWriting";

  const term = propTerm ?? route.params?.term;

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

  if (!term) {
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

  const display = resolveTermDisplay(term, displayMode);

  return (
    <View style={[styles.container, { paddingBottom: hotBarInset }]}>
      <Text style={styles.title}>Sintoma Apontado</Text>

      <View style={styles.content}>
        <View style={styles.card}>
          <View
            style={[
              styles.imageContainer,
              isSignWriting && styles.signWritingContainer,
            ]}
          >
            <Image
              source={display.imageSource}
              style={styles.image}
              contentFit="contain"
            />
          </View>
          <Text
            style={styles.label}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
          >
            {display.label}
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
    gap: CONTAINERS.spacings.sm,
    alignItems: "center",
    justifyContent: "center",
    padding: CONTAINERS.spacings.md,
  },
  imageContainer: {
    width: "70%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  signWritingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: CONTAINERS.radius.md,
    padding: CONTAINERS.spacings.xs,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  label: {
    width: "100%",
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
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
