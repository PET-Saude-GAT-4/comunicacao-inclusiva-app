import { Board } from "@/types/board.types";
import { Term } from "@/types/term.types";
import { Image } from "react-native";

const defaultSignWritingSource = Image.resolveAssetSource(
  require("../../assets/images/olho.png"),
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
const createTerm = (
  id: number,
  uuid: string,
  description: string,
  imageRequire: any,
): Term => {
  const now = new Date().toISOString();
  return {
    description, // Descrição que vem do Term
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

export const boardTermsMock: Record<string, Term[]> = {
  "board-1": [
    createTerm(1, "1", "Andar", require("../../assets/images/andar.png")),
    createTerm(
      2,
      "2",
      "Cabeça",
      require("../../assets/images/cabeca.png"),
    ),
    createTerm(
      3,
      "3",
      "Com Raiva",
      require("../../assets/images/com_raiva.png"),
    ),
    createTerm(4, "4", "Comer", require("../../assets/images/comer.png")),
    createTerm(
      5,
      "5",
      "Correr",
      require("../../assets/images/correr.png"),
    ),
    createTerm(
      6,
      "6",
      "Escrever",
      require("../../assets/images/escrever.png"),
    ),
    createTerm(7, "7", "Feliz", require("../../assets/images/feliz.png")),
    createTerm(8, "8", "Nariz", require("../../assets/images/nariz.png")),
    createTerm(9, "9", "Olho", require("../../assets/images/olho.png")),
    createTerm(
      10,
      "10",
      "Orelha",
      require("../../assets/images/orelha.png"),
    ),
    createTerm(
      11,
      "11",
      "Triste",
      require("../../assets/images/triste.png"),
    ),
    createTerm(12, "12", "Boca", require("../../assets/images/boca.png")),
    createTerm(
      13,
      "13",
      "Coração",
      require("../../assets/images/coracao.png"),
    ),
    createTerm(
      14,
      "14",
      "Dente",
      require("../../assets/images/dente.png"),
    ),
    createTerm(15, "15", "Mão", require("../../assets/images/mao.png")),
    createTerm(16, "16", "Rins", require("../../assets/images/rins.png")),
  ],
  "board-2": [
    createTerm(1, "1", "Andar", require("../../assets/images/andar.png")),
    createTerm(4, "4", "Comer", require("../../assets/images/comer.png")),
    createTerm(
      5,
      "5",
      "Correr",
      require("../../assets/images/correr.png"),
    ),
    createTerm(
      6,
      "6",
      "Escrever",
      require("../../assets/images/escrever.png"),
    ),
  ],
  "board-3": [
    createTerm(
      2,
      "2",
      "Cabeça",
      require("../../assets/images/cabeca.png"),
    ),
    createTerm(8, "8", "Nariz", require("../../assets/images/nariz.png")),
    createTerm(9, "9", "Olho", require("../../assets/images/olho.png")),
    createTerm(
      10,
      "10",
      "Orelha",
      require("../../assets/images/orelha.png"),
    ),
    createTerm(12, "12", "Boca", require("../../assets/images/boca.png")),
    createTerm(
      13,
      "13",
      "Coração",
      require("../../assets/images/coracao.png"),
    ),
    createTerm(
      14,
      "14",
      "Dente",
      require("../../assets/images/dente.png"),
    ),
    createTerm(15, "15", "Mão", require("../../assets/images/mao.png")),
    createTerm(16, "16", "Rins", require("../../assets/images/rins.png")),
  ],
  "board-4": [
    createTerm(
      3,
      "3",
      "Com Raiva",
      require("../../assets/images/com_raiva.png"),
    ),
    createTerm(7, "7", "Feliz", require("../../assets/images/feliz.png")),
    createTerm(
      11,
      "11",
      "Triste",
      require("../../assets/images/triste.png"),
    ),
  ],
  "board-5": [
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
    createTerm(
      0,
      "0",
      "prototype",
      require("../../assets/images/alert.png"),
    ),
  ],
};
