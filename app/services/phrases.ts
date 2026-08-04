import { phraseAdapter } from "@/adapters/phraseAdapter";
import { request } from "@/services/http";
import { ApiPhrase, Phrase } from "@/types/phrase.types";
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class PhraseService {
  async getPhrases(): Promise<Phrase[]> {
    const response = await request(`${API_BASE_URL}/public/phrases`);

    return response.phrases.map((phrase: ApiPhrase) =>
      phraseAdapter.toPhrase(phrase),
    );
  }

  async getPhraseById(uuid: string): Promise<Phrase> {
    const response = await request(`${API_BASE_URL}/public/phrases/${uuid}`);

    return phraseAdapter.toPhrase(response.phrase);
  }
}
