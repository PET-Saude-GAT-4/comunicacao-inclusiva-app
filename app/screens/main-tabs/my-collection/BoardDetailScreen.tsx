import { useBoardPictogram } from "@/hooks/useBoardPictograms";
import { MyCollectionStackParamList } from "@/navigation/types";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RouteProp } from "@react-navigation/native";
import { Image } from "expo-image";
import { FlatList, Text, View } from "react-native";
import { styles } from "./BoardDetailScreen.style";

type DetailsRouteProp = RouteProp<MyCollectionStackParamList, "BoardDetails">;

type Props = {
  route: DetailsRouteProp;
};

export default function BoardDetailScreen({ route }: Props) {
  const { board } = route.params;

  const { pictograms, isLoading: isLoadingPics } = useBoardPictogram(
    board.uuid || "",
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        data={pictograms}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <View style={styles.pictogramDiv}>
            <Image source={item.imageSource} style={styles.pictogramImg} />
            <Text style={styles.pictogramText} numberOfLines={1}>
              {item.description.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
