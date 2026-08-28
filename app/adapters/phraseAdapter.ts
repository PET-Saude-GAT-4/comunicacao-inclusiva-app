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
      items: (apiData.items ?? []).map((item) => this.toPhraseItem(item)),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },
};
