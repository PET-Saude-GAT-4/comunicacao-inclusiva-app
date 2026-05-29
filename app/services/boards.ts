import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiBoard, Board } from "@/types/board.types";
import { ApiPictogram, Pictogram } from "@/types/pictogram.types";
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class BoardService {
  private async request(url: string, timeoutMs = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.log(error);
      throw error;
    }
  }

  async getBoards(): Promise<Board[]> {
    const response = await this.request(`${API_BASE_URL}/public/boards`);

    return response.boards.map((board: ApiBoard) => boardAdapter.toBoard(board));
  }

  async getBoardById(uuid: string): Promise<Board> {
    const response = await this.request(`${API_BASE_URL}/public/boards/${uuid}`);

    return boardAdapter.toBoard(response.board);
  }

  async getBoardPictograms(uuid: string): Promise<Pictogram[]> {
    const response = await this.request(
      `${API_BASE_URL}/public/boards/${uuid}/pictograms`,
    );
    return response.pictograms.map((pic: ApiPictogram) =>
      boardAdapter.toPictogram(pic),
    );
  }
}
