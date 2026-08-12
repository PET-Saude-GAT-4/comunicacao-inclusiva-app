import { ApiPictogram, Pictogram } from "./pictogram.types";

export interface Phrase {
  uuid: string;
  description: string;
  pictograms: Pictogram[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiPhrase {
  uuid: string;
  description: string;
  pictograms: ApiPictogram[];
  createdAt: string;
  updatedAt: string;
}
