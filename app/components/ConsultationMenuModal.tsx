import { useSession } from "@/hooks/useSession";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "@/navigation/types";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function ConsultationMenuModal({ visible, onClose }: Props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    startConsultation,
    currentSpeaker,
    isInConsultation,
  } = useSession();

  const handleStart = () => {
    startConsultation();
    onClose();
  };

  const handleEnd = () => {
    navigation.navigate("ReportScreen");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* It can be removed, NoCnsultationScreen already validates this */}
          {currentSpeaker === "professional" &&
            (!isInConsultation ? (
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { backgroundColor: COLORS.primary },
                ]}
                onPress={handleStart}
              >
                <Text style={styles.optionText}>Iniciar atendimento</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  { backgroundColor: COLORS.errorPrimary },
                ]}
                onPress={handleEnd}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: COLORS.text.onPrimaryDark },
                  ]}
                >
                  Finalizar atendimento
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={COLORS.text.onPrimaryDark}
                />
              </TouchableOpacity>
            ))}

          <TouchableOpacity
            style={[
              styles.optionButton,
              { backgroundColor: COLORS.surface.secondary },
            ]}
            onPress={() => { }}
          >
            <Text style={styles.optionText}>Prancha de Frequência</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              { backgroundColor: COLORS.surface.secondary },
            ]}
            onPress={() => {
              onClose();
              // @ts-ignore - bypassing strict type for nested nav
              navigation.navigate("MainTabNav", {
                screen: "CommBoardStackNav",
                params: {
                  screen: "CommBoardScreen",
                  params: { mode: "bodyMap" }
                }
              });
            }}
          >
            <Text style={styles.optionText}>Localização de Sintoma</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              { backgroundColor: COLORS.surface.secondary },
            ]}
            onPress={() => { }}
          >
            <Text style={styles.optionText}>Coleção de Pranchas</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: CONTAINERS.spacings.lg,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: COLORS.background,
    borderRadius: CONTAINERS.radius.lg,
    padding: CONTAINERS.spacings.lg,
  },
  optionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: CONTAINERS.spacings.md,
    borderRadius: CONTAINERS.radius.sm,
    marginBottom: CONTAINERS.spacings.sm,
  },
  optionText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "500",
    color: "#000",
  },
  closeButton: {
    marginTop: CONTAINERS.spacings.sm,
    alignItems: "center",
    paddingVertical: CONTAINERS.spacings.md,
  },
  closeButtonText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "600",
    color: COLORS.secondary,
  },
});
