import { useBoardPictogram } from "@/hooks/useBoardPictograms";
import { Board } from "@/types/board.types";
import { FlatList, View } from "react-native";

type Props = {
  route: { params: { board: Board } };
};

export default function ModuleVisualizationScreen({ route }: Props) {
  const { board } = route.params;
  const { pictograms, isLoading: isLoadingPics } = useBoardPictogram(
    board.uuid || "",
  );

  return (
    <View>
      <FlatList
        data={pictograms}
        numColumns={2}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => 
        <View />
        }
      />
    </View>
  );
}
