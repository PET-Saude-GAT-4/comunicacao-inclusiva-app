import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BoardListComponent from "@/components/BoardListComponent";
import { useEmergency } from "@/hooks/useEmergency";
import { EmergencyStackParamList } from "@/navigation/types";

type NavProp = NativeStackNavigationProp<
  EmergencyStackParamList,
  "ModuleVisualization"
>;

export function CatEmergencyScreen() {
  const navigation = useNavigation<NavProp>();

  const { boards } = useEmergency();

  return (
    <BoardListComponent
      boards={boards}
      onBoardPress={(board) =>
        navigation.navigate("ModuleVisualization", { board })
      }
      emptyMessage="Sem módulos de emergência salvos ainda."
      showSaveButton={false}
    />
  );
}
