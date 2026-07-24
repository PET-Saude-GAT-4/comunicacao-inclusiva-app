import { Board } from "@/types/board.types";
import { Pictogram } from "@/types/pictogram.types";
import { Image } from "react-native";


const now = new Date().toISOString();

function img(path: string): string {
  return Image.resolveAssetSource(path as any).uri;
}

const timestamp = () => ({ createdAt: now, updatedAt: now });

const assets = {
  andar:     require("../../assets/images/andar.png"),
  cabeca:    require("../../assets/images/cabeca.png"),
  com_raiva: require("../../assets/images/com_raiva.png"),
  comer:     require("../../assets/images/comer.png"),
  correr:    require("../../assets/images/correr.png"),
  escrever:  require("../../assets/images/escrever.png"),
  feliz:     require("../../assets/images/feliz.png"),
  nariz:     require("../../assets/images/nariz.png"),
  olho:      require("../../assets/images/olho.png"),
  orelha:    require("../../assets/images/orelha.png"),
  triste:    require("../../assets/images/triste.png"),
  boca:      require("../../assets/images/boca.png"),
  coracao:   require("../../assets/images/coracao.png"),
  dente:     require("../../assets/images/dente.png"),
  mao:       require("../../assets/images/mao.png"),
  rins:      require("../../assets/images/rins.png"),
  alert:     require("../../assets/images/alert.png"),
} as const;

function pic(id: number, uuid: string, description: string, asset: any): Pictogram {
  return { id, uuid, description, imageSource: img(asset), ...timestamp() };
}

const PICTOGRAMS = {
  andar:     pic(1,  "pic-1",  "Andar",     assets.andar),
  cabeca:    pic(2,  "pic-2",  "Cabeça",    assets.cabeca),
  com_raiva: pic(3,  "pic-3",  "Com Raiva", assets.com_raiva),
  comer:     pic(4,  "pic-4",  "Comer",     assets.comer),
  correr:    pic(5,  "pic-5",  "Correr",    assets.correr),
  escrever:  pic(6,  "pic-6",  "Escrever",  assets.escrever),
  feliz:     pic(7,  "pic-7",  "Feliz",     assets.feliz),
  nariz:     pic(8,  "pic-8",  "Nariz",     assets.nariz),
  olho:      pic(9,  "pic-9",  "Olho",      assets.olho),
  orelha:    pic(10, "pic-10", "Orelha",    assets.orelha),
  triste:    pic(11, "pic-11", "Triste",    assets.triste),
  boca:      pic(12, "pic-12", "Boca",      assets.boca),
  coracao:   pic(13, "pic-13", "Coração",   assets.coracao),
  dente:     pic(14, "pic-14", "Dente",     assets.dente),
  mao:       pic(15, "pic-15", "Mão",       assets.mao),
  rins:      pic(16, "pic-16", "Rins",      assets.rins),
};

const prototypePics: Pictogram[] = Array.from({ length: 8 }, (_, i) =>
  pic(i, `pic-${i}`, "prototype", assets.alert),
);


export const pictogramsMock: Record<string, Pictogram[]> = {
  "board-1": Object.values(PICTOGRAMS),
  "board-2": [PICTOGRAMS.andar, PICTOGRAMS.comer, PICTOGRAMS.correr, PICTOGRAMS.escrever],
  "board-3": [PICTOGRAMS.cabeca, PICTOGRAMS.nariz, PICTOGRAMS.olho, PICTOGRAMS.orelha, PICTOGRAMS.boca, PICTOGRAMS.coracao, PICTOGRAMS.dente, PICTOGRAMS.mao, PICTOGRAMS.rins],
  "board-4": [PICTOGRAMS.com_raiva, PICTOGRAMS.feliz, PICTOGRAMS.triste],
  "board-5": prototypePics,

  // Emergency modules — each shows symptom pictograms relevant to that specialty
  "module-board-5": [PICTOGRAMS.coracao, PICTOGRAMS.mao, PICTOGRAMS.andar, PICTOGRAMS.triste], // Cardiologia
  "module-board-6": [PICTOGRAMS.cabeca, PICTOGRAMS.olho, PICTOGRAMS.orelha, PICTOGRAMS.escrever, PICTOGRAMS.mao], // Neurologia
  "module-board-7": [PICTOGRAMS.mao, PICTOGRAMS.andar, PICTOGRAMS.correr, PICTOGRAMS.cabeca], // Ortopedia
  "module-board-8": Object.values(PICTOGRAMS), // Geral — full set
};

function board(id: number, uuid: string, title: string, pictograms: Pictogram[]): Board {
  return {
    id,
    uuid,
    title,
    pictogramCount: pictograms.length,
    representativePictogram: pictograms[0],
    ...timestamp(),
  };
}


export const boardsMock: Board[] = [
  // Fallback cache boards
  board(1, "board-1",        "Geral",       pictogramsMock["board-1"]),
  board(2, "board-2",        "Ações",       pictogramsMock["board-2"]),
  board(3, "board-3",        "Corpo",       pictogramsMock["board-3"]),
  board(4, "board-4",        "Sentimentos", pictogramsMock["board-4"]),

  // Emergency modules
  board(5, "module-board-5", "Cardiologia", prototypePics),
  board(6, "module-board-6", "Neurologia",  prototypePics),
  board(7, "module-board-7", "Ortopedia",   prototypePics),
  board(8, "module-board-8", "Geral",       prototypePics),
];
