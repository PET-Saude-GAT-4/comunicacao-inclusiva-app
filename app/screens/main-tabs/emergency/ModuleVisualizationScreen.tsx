import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";
import { usePreferences } from "@/hooks/usePreferences";
import { useModuleBoardTerms } from "@/hooks/useModuleBoardTerms";
import { EmergencyStackParamList } from "@/navigation/types";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ModuleVisualizationRouteProp = RouteProp<
  EmergencyStackParamList,
  "ModuleVisualization"
>;

export default function ModuleVisualizationScreen() {
  const navigation = useNavigation();
  const route = useRoute<ModuleVisualizationRouteProp>();
  const { board } = route.params;
  const { displayMode } = usePreferences();

  const { terms, isLoading: isLoadingTerms } = useModuleBoardTerms(
    board.uuid || "",
  );

  function onTap(term: Term) {
    // Supposedly leads to communication board, with the context of such, meaning each
    // of the terms housed here are linked to a context somehow
    console.log(term.description);
  }

  useEffect(() => {
    navigation.setOptions({ title: board.title });
  }, [navigation, board.title]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: TYPOGRAPHY.sizes.heading }}>
        Aponte o sintoma
      </Text>

      <FlatList
        style={{ padding: CONTAINERS.spacings.lg }}
        data={terms}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item: Term) => item.pictogram.uuid}
        renderItem={({ item }: { item: Term }) => {
          const display = resolveTermDisplay(item, displayMode);
          return (
            <TouchableOpacity style={styles.card} onPress={() => onTap(item)}>
              <Image source={{ uri: display.imageSource }} style={styles.image} />
              <Text style={styles.label} numberOfLines={2}>
                {display.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: CONTAINERS.spacings.xl,
    gap: CONTAINERS.spacings.md,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    gap: CONTAINERS.spacings.md,
    paddingBottom: CONTAINERS.spacings.lg,
  },
  row: {
    gap: CONTAINERS.spacings.md,
  },
  card: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: CONTAINERS.radius.lg,
    backgroundColor: COLORS.surface.secondary,
    gap: CONTAINERS.spacings.lg,
    alignItems: "center",
    justifyContent: "center",
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
  },
});
