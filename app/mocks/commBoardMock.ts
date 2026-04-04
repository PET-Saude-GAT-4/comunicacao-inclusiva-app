import { Board } from "../types/board.types";

export const commBoardMock: Board = {
  id: 1,
  title: "Comuns",
  items: [
    {
      order: 1,
      pictogram: {
        id: 1,
        description: "Eu",
        imageUrl: require("../../assets/images/icon.png"),
      },
    },
    {
      order: 2,
      pictogram: {
        id: 2,
        description: "Querer",
        imageUrl: require("../../assets/images/icon.png"),
      },
    },
  ],
};
