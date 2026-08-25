import { Board } from "@/types/board.types";
import { BoardItem } from "@/types/item.types";
import { Image } from "react-native";

const defaultSignWritingSource = Image.resolveAssetSource(
  require("../../assets/images/logo.png"),
).uri;

export const boardsMock: Board[] = [
  {
    id: 1,
    uuid: "board-1",
    title: "Geral",
    pictogramCount: 16,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    representativePictogram: {
      id: 1,
      uuid: "pic-1",
      description: "Andar",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/andar.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 2,
    uuid: "board-2",
    title: "Ações",
    pictogramCount: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    representativePictogram: {
      id: 5,
      uuid: "pic-5",
      description: "Correr",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/correr.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 3,
    uuid: "board-3",
    title: "Corpo",
    pictogramCount: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    representativePictogram: {
      id: 2,
      uuid: "pic-2",
      description: "Cabeça",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/cabeca.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  {
    id: 4,
    uuid: "board-4",
    title: "Sentimentos",
    pictogramCount: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    representativePictogram: {
      id: 7,
      uuid: "pic-7",
      description: "Feliz",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/feliz.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
];

export const nextBoardsMock: Record<string, Board[]> = {
  "board-1": [boardsMock[1], boardsMock[2]],
  "board-2": [boardsMock[3]],
  "board-3": [boardsMock[3]],
};

// Helper sem id/uuid na raiz do item
const createBoardItem = (
  id: number,
  uuid: string,
  description: string,
  imageRequire: any,
): BoardItem => {
  const now = new Date().toISOString();
  return {
    description, // Descrição que vem do Slot
    pictogram: {
      id,
      uuid: `pic-${uuid}`,
      description,
      imageSource: Image.resolveAssetSource(imageRequire).uri,
      createdAt: now,
      updatedAt: now,
    },
    signWriting: {
      id,
      uuid: `sw-${uuid}`,
      description,
      imageSource: defaultSignWritingSource,
      createdAt: now,
      updatedAt: now,
    },
  };
};

export const boardItemsMock: Record<string, BoardItem[]> = {
  "board-1": [
    createBoardItem(1, "1", "Andar", require("../../assets/images/andar.png")),
    createBoardItem(
      2,
      "2",
      "Cabeça",
      require("../../assets/images/cabeca.png"),
    ),
    createBoardItem(
      3,
      "3",
      "Com Raiva",
      require("../../assets/images/com_raiva.png"),
    ),
    createBoardItem(4, "4", "Comer", require("../../assets/images/comer.png")),
    createBoardItem(
      5,
      "5",
      "Correr",
      require("../../assets/images/correr.png"),
    ),
    createBoardItem(
      6,
      "6",
      "Escrever",
      require("../../assets/images/escrever.png"),
    ),
    createBoardItem(7, "7", "Feliz", require("../../assets/images/feliz.png")),
    createBoardItem(8, "8", "Nariz", require("../../assets/images/nariz.png")),
    createBoardItem(9, "9", "Olho", require("../../assets/images/olho.png")),
    createBoardItem(
      10,
      "10",
      "Orelha",
      require("../../assets/images/orelha.png"),
    ),
    createBoardItem(
      11,
      "11",
      "Triste",
      require("../../assets/images/triste.png"),
    ),
    createBoardItem(12, "12", "Boca", require("../../assets/images/boca.png")),
    createBoardItem(
      13,
      "13",
      "Coração",
      require("../../assets/images/coracao.png"),
    ),
    createBoardItem(
      14,
      "14",
      "Dente",
      require("../../assets/images/dente.png"),
    ),
    createBoardItem(15, "15", "Mão", require("../../assets/images/mao.png")),
    createBoardItem(16, "16", "Rins", require("../../assets/images/rins.png")),
  ],
  "board-2": [
    createBoardItem(1, "1", "Andar", require("../../assets/images/andar.png")),
    createBoardItem(4, "4", "Comer", require("../../assets/images/comer.png")),
    createBoardItem(
      5,
      "5",
      "Correr",
      require("../../assets/images/correr.png"),
    ),
    createBoardItem(
      6,
      "6",
      "Escrever",
      require("../../assets/images/escrever.png"),
    ),
  ],
  "board-3": [
    createBoardItem(
      2,
      "2",
      "Cabeça",
      require("../../assets/images/cabeca.png"),
    ),
    createBoardItem(8, "8", "Nariz", require("../../assets/images/nariz.png")),
    createBoardItem(9, "9", "Olho", require("../../assets/images/olho.png")),
    createBoardItem(
      10,
      "10",
      "Orelha",
      require("../../assets/images/orelha.png"),
    ),
    createBoardItem(12, "12", "Boca", require("../../assets/images/boca.png")),
    createBoardItem(
      13,
      "13",
      "Coração",
      require("../../assets/images/coracao.png"),
    ),
    createBoardItem(
      14,
      "14",
      "Dente",
      require("../../assets/images/dente.png"),
    ),
    createBoardItem(15, "15", "Mão", require("../../assets/images/mao.png")),
    createBoardItem(16, "16", "Rins", require("../../assets/images/rins.png")),
  ],
  "board-4": [
    createBoardItem(
      3,
      "3",
      "Com Raiva",
      require("../../assets/images/com_raiva.png"),
    ),
    createBoardItem(7, "7", "Feliz", require("../../assets/images/feliz.png")),
    createBoardItem(
      11,
      "11",
      "Triste",
      require("../../assets/images/triste.png"),
    ),
  ],
  "board-5": [
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createBoardItem(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
  ],
};
