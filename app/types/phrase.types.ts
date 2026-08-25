import { ApiPhraseItem, PhraseItem } from "./item.types";

export interface Phrase {
  uuid: string;
  description: string;
  items: PhraseItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiPhrase {
  uuid: string;
  description: string;
  items: ApiPhraseItem[];
  createdAt: string;
  updatedAt: string;
}
