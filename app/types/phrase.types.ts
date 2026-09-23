import { ApiTerm, Term } from "./term.types";

export interface Phrase {
  uuid: string;
  description: string;
  terms: Term[];
  // Whether the phrase is meant to be browsed. An unlisted one still syncs and
  // still matches what is being composed; it just stays out of the catalogue.
  listedInLibrary: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPhrase {
  uuid: string;
  description: string;
  terms: ApiTerm[];
  listedInLibrary: boolean;
  createdAt: string;
  updatedAt: string;
}
