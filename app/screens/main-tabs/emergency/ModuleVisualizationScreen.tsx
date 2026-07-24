import { COLORS, CONTAINERS, TYPOGRAPHY } from "@/styles/themes";

import { useModuleBoardPictogram } from "@/hooks/useModulePictograms";
import { EmergencyStackParamList } from "@/navigation/types";
import { Pictogram } from "@/types/pictogram.types";
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

  const { pictograms, isLoading: isLoadingPics } = useModuleBoardPictogram(
    board.uuid || "",
  );

  function onTap(pictogram: Pictogram) {
    // Supposedly leads to communication board, with the context of such, meaning each
    // of the pictograms housed here are linked to a context somehow
    console.log(pictogram.description);
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
        data={pictograms}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => onTap(item)}>
            <Image source={item.imageSource} style={styles.image} />
            <Text style={styles.label} numberOfLines={2}>
              {item.description.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
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
