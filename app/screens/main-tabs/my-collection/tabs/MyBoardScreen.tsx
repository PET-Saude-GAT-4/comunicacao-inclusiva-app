import { commBoardMock } from "@/mocks/commBoardMock";
import { Board } from "@/types/board.types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./MyBoardScreen.style";

export default function MyBoardScreen() {
  const navigation = useNavigation();

  const boards: Board[] = [commBoardMock, { ...commBoardMock, id: 2 }];

  return (
    <View style={styles.container}>
      <FlatList
        data={boards}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.boardBackground}>
              <Image source={item.imageUrl} style={styles.boardImage} />
              <View style={styles.divider} />
              <Text style={styles.boradTitle}>{item.title}</Text>
              <MaterialIcons name="arrow-forward-ios" size={25} color="#000" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
