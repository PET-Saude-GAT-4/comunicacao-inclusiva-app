import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, CONTAINERS } from '@/styles/themes';
import { useSession } from '@/hooks/useSession';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function ConsultationMenuModal({ visible, onClose }: Props) {
  const { startConsultation, endConsultation, currentSpeaker } = useSession();

  const handleStart = () => {
    startConsultation();
    onClose();
  };

  const handleEnd = () => {
    endConsultation();
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
          {currentSpeaker === "professional" && (
            <TouchableOpacity style={[styles.optionButton, { backgroundColor: COLORS.primary }]} onPress={handleStart}>
              <Text style={styles.optionText}>Iniciar atendimento</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.optionButton, { backgroundColor: COLORS.surface.secondary }]} onPress={() => {}}>
            <Text style={styles.optionText}>Prancha de Frequência</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionButton, { backgroundColor: COLORS.surface.secondary }]} onPress={() => {}}>
            <Text style={styles.optionText}>Localização de Sintoma</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionButton, { backgroundColor: COLORS.surface.secondary }]} onPress={() => {}}>
            <Text style={styles.optionText}>Coleção de Pranchas</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          {currentSpeaker === "professional" && (
            <TouchableOpacity style={[styles.optionButton, { backgroundColor: COLORS.errorPrimary }]} onPress={handleEnd}>
              <Text style={[styles.optionText, { color: COLORS.text.onPrimaryDark }]}>Finalizar atendimento</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.text.onPrimaryDark} />
            </TouchableOpacity>
          )}

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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: CONTAINERS.spacings.lg,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: CONTAINERS.radius.lg,
    padding: CONTAINERS.spacings.lg,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: CONTAINERS.spacings.md,
    borderRadius: CONTAINERS.radius.sm,
    marginBottom: CONTAINERS.spacings.sm,
  },
  optionText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: '500',
    color: '#000',
  },
  closeButton: {
    marginTop: CONTAINERS.spacings.sm,
    alignItems: 'center',
    paddingVertical: CONTAINERS.spacings.md,
  },
  closeButtonText: {
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: '600',
    color: COLORS.secondary,
  },
});
