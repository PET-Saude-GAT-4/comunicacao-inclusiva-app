import { PhraseItem } from "@/types/item.types";
import { Phrase } from "@/types/phrase.types";
import { Pictogram } from "@/types/pictogram.types";
import { SignWriting } from "@/types/signWriting.types";
import { Image } from "react-native";

const now = new Date().toISOString();

function img(asset: any): string {
  return Image.resolveAssetSource(asset).uri;
}

const timestamp = () => ({ createdAt: now, updatedAt: now });

const assets = {
  cabeca: require("../../assets/images/cabeca.png"),
  comer: require("../../assets/images/comer.png"),
  feliz: require("../../assets/images/feliz.png"),
  triste: require("../../assets/images/triste.png"),
  logo: require("../../assets/images/logo.png"),
} as const;

function createPhraseItem(
  id: number,
  uuidSuffix: string,
  description: string,
  asset: any,
): PhraseItem {
  const pictogram: Pictogram = {
    id,
    uuid: `pic-${uuidSuffix}`,
    description,
    imageSource: img(asset),
    ...timestamp(),
  };

  const signWriting: SignWriting = {
    id,
    uuid: `sw-${uuidSuffix}`,
    description,
    imageSource: img(assets.logo),
    ...timestamp(),
  };

  return {
    description,
    pictogram,
    signWriting,
  };
}

export const phrasesMock: Phrase[] = [
  {
    uuid: "phrase-1",
    description: "Estou com dor de cabeça",
    createdAt: now,
    updatedAt: now,
    items: [createPhraseItem(2, "2", "Cabeça", assets.cabeca)],
  },
  {
    uuid: "phrase-2",
    description: "Estou com fome",
    createdAt: now,
    updatedAt: now,
    items: [createPhraseItem(4, "4", "Comer", assets.comer)],
  },
  {
    uuid: "phrase-3",
    description: "Estou feliz",
    createdAt: now,
    updatedAt: now,
    items: [createPhraseItem(7, "7", "Feliz", assets.feliz)],
  },
  {
    uuid: "phrase-4",
    description: "Estou triste",
    createdAt: now,
    updatedAt: now,
    items: [createPhraseItem(11, "11", "Triste", assets.triste)],
  },
];
