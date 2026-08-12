import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiPhrase, Phrase } from "@/types/phrase.types";

export const phraseAdapter = {
  toPhrase(apiData: ApiPhrase): Phrase {
    return {
      uuid: apiData.uuid,
      description: apiData.description,
      // The API already returns the pictograms in the order they should be read.
      pictograms: apiData.pictograms.map((pictogram) =>
        boardAdapter.toPictogram(pictogram),
      ),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },
};
