import { Board } from "@/types/board.types";
import { Pictogram } from "@/types/pictogram.types";
import { SignWriting } from "@/types/signWriting.types";
import { Term } from "@/types/term.types";
import { Image } from "react-native";

const now = new Date().toISOString();

const timestamp = () => ({ createdAt: now, updatedAt: now });

function img(asset: any): string {
  return Image.resolveAssetSource(asset).uri;
}

// Mirrors TERM_FILES in the api repo. Both halves of
// every term are vendored under assets/images/boards, keeping the API's category
// folders and filenames.
const assets = {
  body: {
    pictogram: require("../../assets/images/boards/body-parts/body/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/body/signwriting.png"),
  },
  malaise: {
    pictogram: require("../../assets/images/boards/general-symptoms/malaise/pictogram.png"),
    signWriting: require("../../assets/images/boards/general-symptoms/malaise/signwriting.png"),
  },
  water: {
    pictogram: require("../../assets/images/boards/basic-needs/water/pictogram.png"),
    signWriting: require("../../assets/images/boards/basic-needs/water/signwriting.png"),
  },
  food: {
    pictogram: require("../../assets/images/boards/basic-needs/food/pictogram.png"),
    signWriting: require("../../assets/images/boards/basic-needs/food/signwriting.png"),
  },
  bathroom: {
    pictogram: require("../../assets/images/boards/basic-needs/bathroom/pictogram.png"),
    signWriting: require("../../assets/images/boards/basic-needs/bathroom/signwriting.png"),
  },
  sleep: {
    pictogram: require("../../assets/images/boards/basic-needs/sleep/pictogram.png"),
    signWriting: require("../../assets/images/boards/basic-needs/sleep/signwriting.png"),
  },
  rest: {
    pictogram: require("../../assets/images/boards/basic-needs/rest/pictogram.png"),
    signWriting: require("../../assets/images/boards/basic-needs/rest/signwriting.png"),
  },
  happy: {
    pictogram: require("../../assets/images/boards/emotions-and-state/happy/pictogram.png"),
    signWriting: require("../../assets/images/boards/emotions-and-state/happy/signwriting.png"),
  },
  sad: {
    pictogram: require("../../assets/images/boards/emotions-and-state/sad/pictogram.png"),
    signWriting: require("../../assets/images/boards/emotions-and-state/sad/signwriting.png"),
  },
  afraid: {
    pictogram: require("../../assets/images/boards/emotions-and-state/afraid/pictogram.png"),
    signWriting: require("../../assets/images/boards/emotions-and-state/afraid/signwriting.png"),
  },
  irritated: {
    pictogram: require("../../assets/images/boards/emotions-and-state/irritated/pictogram.png"),
    signWriting: require("../../assets/images/boards/emotions-and-state/irritated/signwriting.png"),
  },
  anxious: {
    pictogram: require("../../assets/images/boards/emotions-and-state/anxious/pictogram.png"),
    signWriting: require("../../assets/images/boards/emotions-and-state/anxious/signwriting.png"),
  },
  calm: {
    pictogram: require("../../assets/images/boards/emotions-and-state/calm/pictogram.png"),
    signWriting: require("../../assets/images/boards/emotions-and-state/calm/signwriting.png"),
  },
  confused: {
    pictogram: require("../../assets/images/boards/emotions-and-state/confused/pictogram.png"),
    signWriting: require("../../assets/images/boards/emotions-and-state/confused/signwriting.png"),
  },
  head: {
    pictogram: require("../../assets/images/boards/body-parts/head/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/head/signwriting.png"),
  },
  eyes: {
    pictogram: require("../../assets/images/boards/body-parts/eyes/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/eyes/signwriting.png"),
  },
  ear: {
    pictogram: require("../../assets/images/boards/body-parts/ear/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/ear/signwriting.png"),
  },
  nose: {
    pictogram: require("../../assets/images/boards/body-parts/nose/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/nose/signwriting.png"),
  },
  mouth: {
    pictogram: require("../../assets/images/boards/body-parts/mouth/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/mouth/signwriting.png"),
  },
  tooth: {
    pictogram: require("../../assets/images/boards/body-parts/tooth/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/tooth/signwriting.png"),
  },
  throat: {
    pictogram: require("../../assets/images/boards/body-parts/throat/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/throat/signwriting.png"),
  },
  lung: {
    pictogram: require("../../assets/images/boards/body-parts/lung/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/lung/signwriting.png"),
  },
  heart: {
    pictogram: require("../../assets/images/boards/body-parts/heart/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/heart/signwriting.png"),
  },
  belly: {
    pictogram: require("../../assets/images/boards/body-parts/belly/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/belly/signwriting.png"),
  },
  arm: {
    pictogram: require("../../assets/images/boards/body-parts/arm/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/arm/signwriting.png"),
  },
  leg: {
    pictogram: require("../../assets/images/boards/body-parts/leg/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/leg/signwriting.png"),
  },
  foot: {
    pictogram: require("../../assets/images/boards/body-parts/foot/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/foot/signwriting.png"),
  },
  back: {
    pictogram: require("../../assets/images/boards/body-parts/back/pictogram.png"),
    signWriting: require("../../assets/images/boards/body-parts/back/signwriting.png"),
  },
  nausea: {
    pictogram: require("../../assets/images/boards/general-symptoms/nausea/pictogram.png"),
    signWriting: require("../../assets/images/boards/general-symptoms/nausea/signwriting.png"),
  },
  dizziness: {
    pictogram: require("../../assets/images/boards/general-symptoms/dizziness/pictogram.png"),
    signWriting: require("../../assets/images/boards/general-symptoms/dizziness/signwriting.png"),
  },
  "shortness-of-breath": {
    pictogram: require("../../assets/images/boards/general-symptoms/shortness-of-breath/pictogram.png"),
    signWriting: require("../../assets/images/boards/general-symptoms/shortness-of-breath/signwriting.png"),
  },
  fatigue: {
    pictogram: require("../../assets/images/boards/general-symptoms/fatigue/pictogram.png"),
    signWriting: require("../../assets/images/boards/general-symptoms/fatigue/signwriting.png"),
  },
  fever: {
    pictogram: require("../../assets/images/boards/general-symptoms/fever/pictogram.png"),
    signWriting: require("../../assets/images/boards/general-symptoms/fever/signwriting.png"),
  },
  tingling: {
    pictogram: require("../../assets/images/boards/general-symptoms/tingling/pictogram.png"),
    signWriting: require("../../assets/images/boards/general-symptoms/tingling/signwriting.png"),
  },
} as const;

export type TermSlug = keyof typeof assets;

function createTerm(slug: TermSlug, description: string): Term {
  const pictogram: Pictogram = {
    uuid: `pic-${slug}`,
    description,
    imageSource: img(assets[slug].pictogram),
    ...timestamp(),
  };

  const signWriting: SignWriting = {
    uuid: `sw-${slug}`,
    description,
    imageSource: img(assets[slug].signWriting),
    ...timestamp(),
  };

  return { uuid: `term-${slug}`, description, pictogram, signWriting };
}

/** Descriptions are byte-for-byte the seed's, accents included. */
export const TERMS: Record<TermSlug, Term> = {
  // Exclusive representatives (not members of any board)
  body: createTerm("body", "Corpo"),
  malaise: createTerm("malaise", "Mal-Estar"),

  // Basic Needs
  water: createTerm("water", "Água"),
  food: createTerm("food", "Comida"),
  bathroom: createTerm("bathroom", "Banheiro"),
  sleep: createTerm("sleep", "Sono"),
  rest: createTerm("rest", "Descanso"),

  // Emotions and State
  happy: createTerm("happy", "Feliz"),
  sad: createTerm("sad", "Triste"),
  afraid: createTerm("afraid", "Com Medo"),
  irritated: createTerm("irritated", "Irritado"),
  anxious: createTerm("anxious", "Ansioso"),
  calm: createTerm("calm", "Calmo"),
  confused: createTerm("confused", "Confuso"),

  // Body Parts
  head: createTerm("head", "Cabeça"),
  eyes: createTerm("eyes", "Olhos"),
  ear: createTerm("ear", "Ouvidos"),
  nose: createTerm("nose", "Nariz"),
  mouth: createTerm("mouth", "Boca"),
  tooth: createTerm("tooth", "Dente"),
  throat: createTerm("throat", "Garganta"),
  lung: createTerm("lung", "Peito / Pulmão"),
  heart: createTerm("heart", "Coração"),
  belly: createTerm("belly", "Barriga"),
  arm: createTerm("arm", "Braço"),
  leg: createTerm("leg", "Perna"),
  foot: createTerm("foot", "Pé"),
  back: createTerm("back", "Costas"),

  // General Symptoms
  nausea: createTerm("nausea", "Náusea"),
  dizziness: createTerm("dizziness", "Tontura"),
  "shortness-of-breath": createTerm("shortness-of-breath", "Falta de Ar"),
  fatigue: createTerm("fatigue", "Cansaço"),
  fever: createTerm("fever", "Febre"),
  tingling: createTerm("tingling", "Formigamento"),
};

export function createBoard(
  uuid: string,
  title: string,
  representative: Term,
  terms: Term[],
): Board {
  return {
    uuid,
    title,
    representativePictogram: representative.pictogram,
    termCount: terms.length,
    ...timestamp(),
  };
}
