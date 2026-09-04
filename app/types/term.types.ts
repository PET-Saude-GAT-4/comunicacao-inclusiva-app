import { ApiPictogram, Pictogram } from "./pictogram.types";
import { ApiSignWriting, SignWriting } from "./signWriting.types";

/** App-side representation of the API's Term entity */
export interface Term {
  description: string;
  pictogram: Pictogram;
  signWriting: SignWriting;
}

/** Wire-format matching the API's TermOutput */
export interface ApiTerm {
  description: string;
  pictogram: ApiPictogram;
  signWriting: ApiSignWriting;
}
