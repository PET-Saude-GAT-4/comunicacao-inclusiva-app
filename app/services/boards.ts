import { Board } from "@/types/board.types";
import { Pictogram } from "@/types/pictogram.types";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class BoardService {
  private async request(url: string) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getBoards(): Promise<Board[]> {
    return this.request(`${API_BASE_URL}/boards`);
  }

  async getBoardById(uuid: string): Promise<Board> {
    return this.request(`${API_BASE_URL}/boards/${uuid}`);
  }

  async getBoardPictograms(uuid: string): Promise<Pictogram[]> {
    return this.request(`${API_BASE_URL}/boards/${uuid}/pictograms`);
  }
}
