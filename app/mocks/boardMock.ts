import { Board } from "@/types/board.types";
import { Pictogram } from "@/types/pictogram.types";
import { Image } from "react-native";

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

export const pictogramsMock: Record<string, Pictogram[]> = {
  "board-1": [
    {
      id: 1,
      uuid: "pic-1",
      description: "Andar",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/andar.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      uuid: "pic-2",
      description: "Cabeça",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/cabeca.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      uuid: "pic-3",
      description: "Com Raiva",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/com_raiva.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      uuid: "pic-4",
      description: "Comer",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/comer.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 5,
      uuid: "pic-5",
      description: "Correr",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/correr.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 6,
      uuid: "pic-6",
      description: "Escrever",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/escrever.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 7,
      uuid: "pic-7",
      description: "Feliz",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/feliz.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 8,
      uuid: "pic-8",
      description: "Nariz",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/nariz.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 9,
      uuid: "pic-9",
      description: "Olho",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/olho.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 10,
      uuid: "pic-10",
      description: "Orelha",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/orelha.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 11,
      uuid: "pic-11",
      description: "Triste",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/triste.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 12,
      uuid: "pic-12",
      description: "Boca",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/boca.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 13,
      uuid: "pic-13",
      description: "Coração",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/coracao.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 14,
      uuid: "pic-14",
      description: "Dente",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/dente.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 15,
      uuid: "pic-15",
      description: "Mão",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/mao.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 16,
      uuid: "pic-16",
      description: "Rins",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/rins.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  "board-2": [
    {
      id: 1,
      uuid: "pic-1",
      description: "Andar",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/andar.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      uuid: "pic-4",
      description: "Comer",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/comer.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 5,
      uuid: "pic-5",
      description: "Correr",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/correr.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 6,
      uuid: "pic-6",
      description: "Escrever",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/escrever.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  "board-3": [
    {
      id: 2,
      uuid: "pic-2",
      description: "Cabeça",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/cabeca.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 8,
      uuid: "pic-8",
      description: "Nariz",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/nariz.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 9,
      uuid: "pic-9",
      description: "Olho",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/olho.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 10,
      uuid: "pic-10",
      description: "Orelha",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/orelha.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 12,
      uuid: "pic-12",
      description: "Boca",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/boca.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 13,
      uuid: "pic-13",
      description: "Coração",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/coracao.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 14,
      uuid: "pic-14",
      description: "Dente",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/dente.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 15,
      uuid: "pic-15",
      description: "Mão",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/mao.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 16,
      uuid: "pic-16",
      description: "Rins",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/rins.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  "board-4": [
    {
      id: 3,
      uuid: "pic-3",
      description: "Com Raiva",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/com_raiva.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 7,
      uuid: "pic-7",
      description: "Feliz",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/feliz.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 11,
      uuid: "pic-11",
      description: "Triste",
      imageSource: Image.resolveAssetSource(
        require("../../assets/images/triste.png"),
      ).uri,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};
