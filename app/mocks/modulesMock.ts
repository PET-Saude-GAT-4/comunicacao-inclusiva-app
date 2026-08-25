import { Board } from "@/types/board.types";
import { BoardItem } from "@/types/item.types";
import { Pictogram } from "@/types/pictogram.types";
import { SignWriting } from "@/types/signWriting.types";
import { Image } from "react-native";

const now = new Date().toISOString();

function img(asset: any): string {
  return Image.resolveAssetSource(asset).uri;
}

const timestamp = () => ({ createdAt: now, updatedAt: now });

const assets = {
  andar: require("../../assets/images/andar.png"),
  cabeca: require("../../assets/images/cabeca.png"),
  com_raiva: require("../../assets/images/com_raiva.png"),
  comer: require("../../assets/images/comer.png"),
  correr: require("../../assets/images/correr.png"),
  escrever: require("../../assets/images/escrever.png"),
  feliz: require("../../assets/images/feliz.png"),
  nariz: require("../../assets/images/nariz.png"),
  olho: require("../../assets/images/olho.png"),
  orelha: require("../../assets/images/orelha.png"),
  triste: require("../../assets/images/triste.png"),
  boca: require("../../assets/images/boca.png"),
  coracao: require("../../assets/images/coracao.png"),
  dente: require("../../assets/images/dente.png"),
  mao: require("../../assets/images/mao.png"),
  rins: require("../../assets/images/rins.png"),
  alert: require("../../assets/images/alert.png"),
  logo: require("../../assets/images/logo.png"),
} as const;

function createItem(
  id: number,
  uuidSuffix: string,
  description: string,
  asset: any,
): BoardItem {
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

const ITEMS = {
  andar: createItem(1, "1", "Andar", assets.andar),
  cabeca: createItem(2, "2", "Cabeça", assets.cabeca),
  com_raiva: createItem(3, "3", "Com Raiva", assets.com_raiva),
  comer: createItem(4, "4", "Comer", assets.comer),
  correr: createItem(5, "5", "Correr", assets.correr),
  escrever: createItem(6, "6", "Escrever", assets.escrever),
  feliz: createItem(7, "7", "Feliz", assets.feliz),
  nariz: createItem(8, "8", "Nariz", assets.nariz),
  olho: createItem(9, "9", "Olho", assets.olho),
  orelha: createItem(10, "10", "Orelha", assets.orelha),
  triste: createItem(11, "11", "Triste", assets.triste),
  boca: createItem(12, "12", "Boca", assets.boca),
  coracao: createItem(13, "13", "Coração", assets.coracao),
  dente: createItem(14, "14", "Dente", assets.dente),
  mao: createItem(15, "15", "Mão", assets.mao),
  rins: createItem(16, "16", "Rins", assets.rins),
};

const prototypeItems: BoardItem[] = Array.from({ length: 8 }, (_, i) =>
  createItem(i, `proto-${i}`, "prototype", assets.alert),
);

export const boardItemsMock: Record<string, BoardItem[]> = {
  "board-1": Object.values(ITEMS),
  "board-2": [ITEMS.andar, ITEMS.comer, ITEMS.correr, ITEMS.escrever],
  "board-3": [
    ITEMS.cabeca,
    ITEMS.nariz,
    ITEMS.olho,
    ITEMS.orelha,
    ITEMS.boca,
    ITEMS.coracao,
    ITEMS.dente,
    ITEMS.mao,
    ITEMS.rins,
  ],
  "board-4": [ITEMS.com_raiva, ITEMS.feliz, ITEMS.triste],
  "board-5": prototypeItems,

  // Emergency modules — cada um com os itens da especialidade
  "module-board-5": [ITEMS.coracao, ITEMS.mao, ITEMS.andar, ITEMS.triste], // Cardiologia
  "module-board-6": [
    ITEMS.cabeca,
    ITEMS.olho,
    ITEMS.orelha,
    ITEMS.escrever,
    ITEMS.mao,
  ], // Neurologia
  "module-board-7": [ITEMS.mao, ITEMS.andar, ITEMS.correr, ITEMS.cabeca], // Ortopedia
  "module-board-8": Object.values(ITEMS), // Geral — conjunto completo
};

function board(
  id: number,
  uuid: string,
  title: string,
  items: BoardItem[],
): Board {
  return {
    id,
    uuid,
    title,
    pictogramCount: items.length,
    representativePictogram: items[0].pictogram,
    ...timestamp(),
  };
}

export const boardsMock: Board[] = [
  // Fallback cache boards
  board(1, "board-1", "Geral", boardItemsMock["board-1"]),
  board(2, "board-2", "Ações", boardItemsMock["board-2"]),
  board(3, "board-3", "Corpo", boardItemsMock["board-3"]),
  board(4, "board-4", "Sentimentos", boardItemsMock["board-4"]),

  // Emergency modules
  board(5, "module-board-5", "Cardiologia", prototypeItems),
  board(6, "module-board-6", "Neurologia", prototypeItems),
  board(7, "module-board-7", "Ortopedia", prototypeItems),
  board(8, "module-board-8", "Geral", prototypeItems),
];
