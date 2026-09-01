import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { BodyRegionSlug, BODY_REGIONS } from "@/constants/bodyMapRegions";
import { BodyFrontView } from "./BodyFrontView";
import { BodyBackView } from "./BodyBackView";
import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSession } from "@/hooks/useSession";

interface Props {
  onSend: (regions: string) => void;
}

export function BodyMap({ onSend }: Props) {
  const [selectedRegions, setSelectedRegions] = useState<BodyRegionSlug[]>([]);
  const [isFrontView, setIsFrontView] = useState(true);
  const { isInConsultation } = useSession(); // Will only send if it's triage or consultation

  const handleRegionPress = (slug: BodyRegionSlug) => {
    setSelectedRegions((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((r) => r !== slug);
      }
      return [...prev, slug];
    });
  };

  const handleSend = () => {
    if (selectedRegions.length === 0) return;
    const regionNames = selectedRegions.map((slug) => BODY_REGIONS[slug]).join(", ");
    onSend(`Dor: ${regionNames}`);
    setSelectedRegions([]); // Clear selection after send
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsFrontView((prev) => !prev)}
        >
          <MaterialCommunityIcons name="sync" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.helperText}>Toque no local do sintoma</Text>
      </View>

      <View style={styles.mapContainer}>
        {isFrontView ? (
          <BodyFrontView
            selectedRegions={selectedRegions}
            onRegionPress={handleRegionPress}
          />
        ) : (
          <BodyBackView
            selectedRegions={selectedRegions}
            onRegionPress={handleRegionPress}
          />
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.sendButton,
          selectedRegions.length === 0 && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={selectedRegions.length === 0}
      >
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: CONTAINERS.spacings.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: CONTAINERS.spacings.md,
  },
  toggleButton: {
    padding: 8,
    borderRadius: CONTAINERS.radius.full,
    backgroundColor: COLORS.surface.secondary,
  },
  helperText: {
    fontSize: TYPOGRAPHY.sizes.body,
    color: COLORS.text.secondary,
  },
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    padding: CONTAINERS.spacings.md,
    borderRadius: CONTAINERS.radius.sm,
    alignItems: "center",
    marginTop: CONTAINERS.spacings.md,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.surface.disabled,
  },
  sendButtonText: {
    color: COLORS.text.onPrimary,
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "bold",
  },
});
