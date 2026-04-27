import { MyCollectionStackParamList } from "@/navigation/types";
import { RouteProp } from "@react-navigation/native";
import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./BoardDetailScreen.style";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

type DetailsRouteProp = RouteProp<MyCollectionStackParamList, "BoardDetails">;

type Props = {
  route: DetailsRouteProp;
};

export default function BoardDetailScreen({ route }: Props) {
  const { board } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={board.imageUrl} style={styles.boardImg} />
        <Text style={styles.boardTitle}>{board.title}</Text>
        <View style={styles.icons}>
        <MaterialIcons name="delete-outline" size={25} color="black"style={styles.delete} />
        <Feather name="edit-2" size={25} color="black" style={styles.edit}/>
        </View>
      </View>

      <FlatList
        data={board.items}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.pictogram.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.pictrogramDiv}>
            <Image
              source={item.pictogram.imageUrl}
              style={styles.pictrogramImg}
            />
            <Text style={styles.pictrogramText} numberOfLines={1}>
              {item.pictogram.description.toUpperCase()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
