import { useBoardTerms } from "@/hooks/useBoardTerms";
import { usePreferences } from "@/hooks/usePreferences";
import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";
import { resolveTermDisplay } from "@/utils/resolveTermDisplay";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { FlatList, Text, View } from "react-native";
import { styles } from "./BoardDetailScreen.style";

type Props = {
  route: { params: { board: Board } };
};

export default function BoardDetailScreen({ route }: Props) {
  const { board } = route.params;
  const { displayMode } = usePreferences();

  const { terms, isLoading: isLoadingTerms } = useBoardTerms(board.uuid || "");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Board header always shows the representative pictogram — not a Term */}
        <Image
          source={board.representativePictogram.imageSource}
          style={styles.boardImg}
        />
        <Text style={styles.boardTitle}>{board.title}</Text>
        <View style={styles.icons}>
          <MaterialIcons
            name="delete-outline"
            size={25}
            color="black"
            style={styles.delete}
          />
          <Feather name="edit-2" size={25} color="black" style={styles.edit} />
        </View>
      </View>

      <FlatList
        data={terms}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item: Term) => item.uuid}
        renderItem={({ item }: { item: Term }) => {
          const display = resolveTermDisplay(item, displayMode);
          return (
            <View style={styles.pictogramDiv}>
              <Image
                source={{ uri: display.imageSource }}
                style={styles.pictogramImg}
              />
              <Text style={styles.pictogramText} numberOfLines={1}>
                {display.label}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
