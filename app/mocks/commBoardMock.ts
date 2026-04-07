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
        imageUrl: require("../../assets/images/eu.png"),
      },
    },
    {
      order: 2,
      pictogram: {
        id: 2,
        description: "Você",
        imageUrl: require("../../assets/images/voce.png"),
      },
    },
    {
      order: 3,
      pictogram: {
        id: 3,
        description: "Querer",
        imageUrl: require("../../assets/images/querer.png"),
      },
    },
    {
      order: 4,
      pictogram: {
        id: 4,
        description: "Logo",
        imageUrl: require("../../assets/images/icon.png"),
      },
    },
  ],
};
