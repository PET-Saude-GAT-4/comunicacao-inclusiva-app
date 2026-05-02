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
    { order: 10, pictogram: { id: 10, description: "Orelha", imageUrl: require("../../assets/images/orelha.png") } },
    { order: 11, pictogram: { id: 11, description: "Triste", imageUrl: require("../../assets/images/triste.png") } },
    { order: 12, pictogram: { id: 12, description: "Boca", imageUrl: require("../../assets/images/boca.png") } },
    { order: 13, pictogram: { id: 13, description: "Coração", imageUrl: require("../../assets/images/coracao.png") } },
    { order: 14, pictogram: { id: 14, description: "Dente", imageUrl: require("../../assets/images/dente.png") } },
    { order: 15, pictogram: { id: 15, description: "Mão", imageUrl: require("../../assets/images/mao.png") } },
    { order: 16, pictogram: { id: 16, description: "Pulmões", imageUrl: require("../../assets/images/pulmoes.png") } },
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
      { order: 4, pictogram: { id: 10, description: "Orelha", imageUrl: require("../../assets/images/orelha.png") } },
      { order: 5, pictogram: { id: 10, description: "Boca", imageUrl: require("../../assets/images/boca.png") } },
      { order: 6, pictogram: { id: 10, description: "Coração", imageUrl: require("../../assets/images/coracao.png") } },
      { order: 7, pictogram: { id: 10, description: "Dente", imageUrl: require("../../assets/images/dente.png") } },
      { order: 8, pictogram: { id: 10, description: "Mão", imageUrl: require("../../assets/images/mao.png") } },
      { order: 9, pictogram: { id: 10, description: "Pulmões", imageUrl: require("../../assets/images/pulmoes.png") } },
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
