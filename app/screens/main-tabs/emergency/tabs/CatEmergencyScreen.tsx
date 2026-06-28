import BoardListComponent from "@/components/BoardListComponent";
import { useBoards } from "@/hooks/useBoards";
import { EmergencyStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";

type NavProp = NativeStackNavigationProp<
  EmergencyStackParamList,
  "ModuleVisualization"
>;

export function CatEmergencyScreen() {
  const navigation = useNavigation<NavProp>();
  const searchQuery = "module";

  const { boards } = useBoards();

  const filteredBoards = useMemo(() => {
    return boards.filter((board) =>
      board.uuid.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, boards]);

  for (let i = 0; i < boards.length; i++) {
    console.log(boards[i].title);
  }

  return (
    <BoardListComponent
      boards={filteredBoards}
      onBoardPress={(board) => navigation.navigate("ModuleVisualization", { board })}
      emptyMessage="Sem módulos de emergência salvos ainda."
      showSaveButton={false}
    />
  );
}
