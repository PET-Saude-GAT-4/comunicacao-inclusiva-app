import { Phrase } from "@/types/phrase.types";
import { Image } from "react-native";

export const phrasesMock: Phrase[] = [
  {
    uuid: "phrase-1",
    description: "Estou com dor de cabeça",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pictograms: [
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
    ],
  },
  {
    uuid: "phrase-2",
    description: "Estou com fome",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pictograms: [
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
    ],
  },
  {
    uuid: "phrase-3",
    description: "Estou feliz",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pictograms: [
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
    ],
  },
  {
    uuid: "phrase-4",
    description: "Estou triste",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pictograms: [
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
  },
];
