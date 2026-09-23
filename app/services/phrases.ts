import { boardAdapter } from "@/adapters/boardAdapter";
import { phraseAdapter } from "@/adapters/phraseAdapter";
import { ApiBoard, Board } from "@/types/board.types";
import { ApiPhrase, Phrase } from "@/types/phrase.types";
import { request } from "@/utils/apiUtils";
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

  async getPhraseNextBoards(uuid: string): Promise<Board[]> {
    const response = await request(
      `${API_BASE_URL}/public/phrases/${uuid}/next-boards`,
    );

    // The API already returns the boards in the order they should be suggested.
    return response.boards.map((board: ApiBoard) =>
      boardAdapter.toBoard(board),
    );
  }
}
