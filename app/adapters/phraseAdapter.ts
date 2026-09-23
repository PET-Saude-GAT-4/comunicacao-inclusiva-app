import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiPhrase, Phrase } from "@/types/phrase.types";
import { ApiTerm, Term } from "@/types/term.types";

export const phraseAdapter = {
  toTerm(apiData: ApiTerm): Term {
    return boardAdapter.toTerm(apiData);
  },

  toPhrase(apiData: ApiPhrase): Phrase {
    return {
      uuid: apiData.uuid,
      description: apiData.description,
      // The API already returns the terms in the order they should be read.
      terms: (apiData.terms ?? []).map((term) => boardAdapter.toTerm(term)),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },
};
