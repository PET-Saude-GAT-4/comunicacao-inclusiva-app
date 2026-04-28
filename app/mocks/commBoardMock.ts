import { Board } from "../types/board.types";

export const commBoardsMock: Board[] = [
  {
    id: 1,
    title: "Geral",
    imageUrl: require("../../assets/images/icon.png"),
    items: [
      { order: 1, pictogram: { id: 1, description: "Andar", imageUrl: require("../../assets/images/andar.png") } },
      { order: 2, pictogram: { id: 2, description: "Cabeça", imageUrl: require("../../assets/images/cabeca.png") } },
      { order: 3, pictogram: { id: 3, description: "Com Raiva", imageUrl: require("../../assets/images/com_raiva.png") } },
      { order: 4, pictogram: { id: 4, description: "Comer", imageUrl: require("../../assets/images/comer.png") } },
      { order: 5, pictogram: { id: 5, description: "Correr", imageUrl: require("../../assets/images/correr.png") } },
      { order: 6, pictogram: { id: 6, description: "Escrever", imageUrl: require("../../assets/images/escrever.png") } },
      { order: 7, pictogram: { id: 7, description: "Feliz", imageUrl: require("../../assets/images/feliz.png") } },
      { order: 8, pictogram: { id: 8, description: "Nariz", imageUrl: require("../../assets/images/nariz.png") } },
      { order: 9, pictogram: { id: 9, description: "Olho", imageUrl: require("../../assets/images/olho.png") } },
      { order: 10, pictogram: { id: 10, description: "Ouvido", imageUrl: require("../../assets/images/ouvido.png") } },
      { order: 11, pictogram: { id: 11, description: "Triste", imageUrl: require("../../assets/images/triste.png") } }
    ],
  },
  {
    id: 2,
    title: "Ações",
    imageUrl: require("../../assets/images/correr.png"),
    items: [
      { order: 1, pictogram: { id: 1, description: "Andar", imageUrl: require("../../assets/images/andar.png") } },
      { order: 2, pictogram: { id: 4, description: "Comer", imageUrl: require("../../assets/images/comer.png") } },
      { order: 3, pictogram: { id: 5, description: "Correr", imageUrl: require("../../assets/images/correr.png") } },
      { order: 4, pictogram: { id: 6, description: "Escrever", imageUrl: require("../../assets/images/escrever.png") } }
    ],
  },
  {
    id: 3,
    title: "Corpo",
    imageUrl: require("../../assets/images/corpo.png"),
    items: [
      { order: 1, pictogram: { id: 2, description: "Cabeça", imageUrl: require("../../assets/images/cabeca.png") } },
      { order: 2, pictogram: { id: 8, description: "Nariz", imageUrl: require("../../assets/images/nariz.png") } },
      { order: 3, pictogram: { id: 9, description: "Olho", imageUrl: require("../../assets/images/olho.png") } },
      { order: 4, pictogram: { id: 10, description: "Ouvido", imageUrl: require("../../assets/images/ouvido.png") } }
    ],
  },
  {
    id: 4,
    title: "Sentimentos",
    imageUrl: require("../../assets/images/feliz.png"),
    items: [
      { order: 1, pictogram: { id: 3, description: "Com Raiva", imageUrl: require("../../assets/images/com_raiva.png") } },
      { order: 2, pictogram: { id: 7, description: "Feliz", imageUrl: require("../../assets/images/feliz.png") } },
      { order: 3, pictogram: { id: 11, description: "Triste", imageUrl: require("../../assets/images/triste.png") } }
    ],
  },
];
