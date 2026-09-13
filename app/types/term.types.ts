import { ApiPictogram, Pictogram } from "./pictogram.types";
import { ApiSignWriting, SignWriting } from "./signWriting.types";

/** App-side representation of the API's Term entity */
export interface Term {
  uuid: string;
  description: string;
  pictogram: Pictogram;
  signWriting: SignWriting;
}

/**
 * Wire format matching the API's placement response: how a Term is returned
 * inside a board or a phrase.
 */
export interface ApiTerm {
  uuid: string;
  termUuid: string;
  description: string;
  pictogram: ApiPictogram;
  signWriting: ApiSignWriting;
  order: number;
}
