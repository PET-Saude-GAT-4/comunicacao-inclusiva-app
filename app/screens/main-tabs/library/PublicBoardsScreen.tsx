import BoardListComponent from "@/components/BoardListComponent";
import { useBoards } from "@/hooks/useBoards";
import { LibraryBoardStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

export default function PublicBoardsScreen() {
  type NavProp = NativeStackNavigationProp<
    LibraryBoardStackParamList,
    "PublicBoardDetails"
  >;
  const navigation = useNavigation<NavProp>();

  const { boards } = useBoards();

  return (
    <BoardListComponent
      boards={boards}
      onBoardPress={(board) =>
        navigation.navigate("PublicBoardDetails", { board })
      }
    />
  );
}
