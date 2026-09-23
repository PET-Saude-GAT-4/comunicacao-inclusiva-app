import { ApiTerm, Term } from "./term.types";

export interface Phrase {
  uuid: string;
  description: string;
  terms: Term[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiPhrase {
  uuid: string;
  description: string;
  terms: ApiTerm[];
  createdAt: string;
  updatedAt: string;
}
