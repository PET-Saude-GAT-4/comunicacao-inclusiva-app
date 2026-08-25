import { ApiPictogram, Pictogram } from "./pictogram.types";
import { ApiSignWriting, SignWriting } from "./signWriting.types";

export interface BoardItem {
  description: string;
  pictogram: Pictogram;
  signWriting: SignWriting;
}

export interface ApiBoardItem {
  description: string;
  pictogram: ApiPictogram;
  signWriting: ApiSignWriting;
}

export interface PhraseItem {
  description: string;
  pictogram: Pictogram;
  signWriting: SignWriting;
}

export interface ApiPhraseItem {
  description: string;
  pictogram: ApiPictogram;
  signWriting: ApiSignWriting;
}
