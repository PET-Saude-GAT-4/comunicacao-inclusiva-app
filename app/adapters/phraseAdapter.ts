import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiPhraseItem, PhraseItem } from "@/types/item.types";
import { ApiPhrase, Phrase } from "@/types/phrase.types";

export const phraseAdapter = {
  toPhraseItem(apiData: ApiPhraseItem): PhraseItem {
    return {
      description: apiData.description,
      pictogram: boardAdapter.toPictogram(apiData.pictogram),
      signWriting: boardAdapter.toSignWriting(apiData.signWriting),
    };
  },

  toPhrase(apiData: ApiPhrase): Phrase {
    return {
      uuid: apiData.uuid,
      description: apiData.description,
      // The API already returns the pictograms in the order they should be read.
      slots: (apiData.slots ?? []).map((slot) => this.toPhraseItem(slot)),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },
};
