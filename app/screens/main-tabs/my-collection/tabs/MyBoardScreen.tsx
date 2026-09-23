import BoardListComponent from "@/components/BoardListComponent";
import { useBoards } from "@/hooks/useBoards";
import { useMyCollection } from "@/hooks/useMyCollection";
import { MyCollectionStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo } from "react";

export default function MyBoardScreen() {
  type NavProp = NativeStackNavigationProp<
    MyCollectionStackParamList,
    "BoardDetails"
  >;
  const navigation = useNavigation<NavProp>();

  const { boards } = useBoards();
  const { savedUuids } = useMyCollection();

  const savedBoards = useMemo(
    () => boards.filter((board) => savedUuids.includes(board.uuid)),
    [boards, savedUuids],
  );

  return (
    <BoardListComponent
      boards={savedBoards}
      onBoardPress={(board) => navigation.navigate("BoardDetails", { board })}
      emptyMessage="Nenhuma prancha salva ainda."
    />
  );
}
