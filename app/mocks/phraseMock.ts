import { TERMS } from "@/mocks/termsMock";
import { Phrase } from "@/types/phrase.types";

const now = new Date().toISOString();

const timestamp = () => ({ createdAt: now, updatedAt: now });

// Descriptions and term sequences mirror PHRASE_DEFS in the
// api repo, in the order the seed writes them.
export const phrasesMock: Phrase[] = [
  {
    uuid: "phrase-1",
    description: "Estou com dor de cabeça",
    terms: [TERMS.head, TERMS.malaise],
    listedInLibrary: true,
    ...timestamp(),
  },
  {
    uuid: "phrase-2",
    description: "Quero beber água",
    terms: [TERMS.mouth, TERMS.water],
    listedInLibrary: true,
    ...timestamp(),
  },
  {
    uuid: "phrase-3",
    description: "Estou com falta de ar",
    terms: [TERMS.lung, TERMS["shortness-of-breath"]],
    listedInLibrary: true,
    ...timestamp(),
  },
  {
    uuid: "phrase-4",
    description: "Estou com náusea e tontura",
    terms: [TERMS.belly, TERMS.nausea, TERMS.dizziness],
    listedInLibrary: true,
    ...timestamp(),
  },
  {
    uuid: "phrase-5",
    description: "Estou cansado e quero descansar",
    terms: [TERMS.fatigue, TERMS.rest],
    listedInLibrary: true,
    ...timestamp(),
  },
  {
    uuid: "phrase-6",
    description: "Preciso ir ao banheiro",
    terms: [TERMS.bathroom],
    listedInLibrary: true,
    ...timestamp(),
  },
  // Reaches the device but stays out of the library: naming the body part alone
  // is a step towards a phrase, not a phrase someone would browse for. It is
  // also a prefix of phrase-1, which is how the sequence matcher hands the match
  // over as more terms are added.
  {
    uuid: "phrase-7",
    description: "Dor de cabeça",
    terms: [TERMS.head],
    listedInLibrary: false,
    ...timestamp(),
  },
];
