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
      <View style={styles.mapBorder}>
        {/* Flip Button */}
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => setIsFrontView((prev) => !prev)}
        >
          <MaterialCommunityIcons name="sync" size={28} color={COLORS.secondary} />
        </TouchableOpacity>

        {/* Tooltip Badge */}
        <View style={styles.tooltipBadge}>
          <MaterialCommunityIcons name="gesture-tap" size={24} color={COLORS.text.onPrimary} />
          <Text style={styles.helperText}>Toque no{"\n"}local do{"\n"}sintoma</Text>
        </View>

        <View style={styles.mapWrapper}>
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
          <Text style={styles.sendButtonText}>Enviar Seleção</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface.primary,
    padding: CONTAINERS.spacings.md,
  },
  mapBorder: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.outlineCommon,
    borderRadius: CONTAINERS.radius.lg,
    backgroundColor: COLORS.surface.primary,
    position: "relative",
    marginTop: CONTAINERS.spacings.md, // para dar espaço pro tooltip
  },
  flipButton: {
    position: "absolute",
    top: CONTAINERS.spacings.md,
    left: CONTAINERS.spacings.md,
    padding: CONTAINERS.spacings.xs,
    zIndex: 10,
    borderRadius: CONTAINERS.radius.full,
    backgroundColor: "transparent",
  },
  tooltipBadge: {
    position: "absolute",
    top: -CONTAINERS.spacings.sm, // faz o badge flutuar um pouco pra fora da borda
    right: CONTAINERS.spacings.sm,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface.secondary,
    paddingHorizontal: CONTAINERS.spacings.sm,
    paddingVertical: CONTAINERS.spacings.xs,
    borderRadius: CONTAINERS.radius.md,
    gap: CONTAINERS.spacings.xs,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  helperText: {
    fontSize: TYPOGRAPHY.sizes.small,
    color: COLORS.text.onPrimary,
    fontWeight: "bold",
    textAlign: "center",
  },
  mapWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: CONTAINERS.spacings.xl,
  },
  sendButton: {
    backgroundColor: COLORS.secondary, // roxo
    padding: CONTAINERS.spacings.md,
    borderRadius: CONTAINERS.radius.md,
    alignItems: "center",
    marginHorizontal: CONTAINERS.spacings.md,
    marginBottom: CONTAINERS.spacings.md,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.surface.secondary,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: TYPOGRAPHY.sizes.bodyEmph,
    fontWeight: "bold",
  },
});
