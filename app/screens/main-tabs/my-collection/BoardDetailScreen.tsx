import { MyCollectionStackParamList } from "@/navigation/types";
import { RouteProp } from "@react-navigation/native";
import { View } from "react-native";

type DetailsRouteProp = RouteProp<MyCollectionStackParamList, "BoardDetails">;

type Props = {
  route: DetailsRouteProp;
};

export default function BoardDetailScreen({ route }: Props) {
  const { item } = route.params;
  return <View></View>;
}
