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
    ...timestamp(),
  },
  {
    uuid: "phrase-2",
    description: "Quero beber água",
    terms: [TERMS.mouth, TERMS.water],
    ...timestamp(),
  },
  {
    uuid: "phrase-3",
    description: "Estou com falta de ar",
    terms: [TERMS.lung, TERMS["shortness-of-breath"]],
    ...timestamp(),
  },
  {
    uuid: "phrase-4",
    description: "Estou com náusea e tontura",
    terms: [TERMS.belly, TERMS.nausea, TERMS.dizziness],
    ...timestamp(),
  },
  {
    uuid: "phrase-5",
    description: "Estou cansado e quero descansar",
    terms: [TERMS.fatigue, TERMS.rest],
    ...timestamp(),
  },
  {
    uuid: "phrase-6",
    description: "Preciso ir ao banheiro",
    terms: [TERMS.bathroom],
    ...timestamp(),
  },
];
