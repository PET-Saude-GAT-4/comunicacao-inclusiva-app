import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiBoard, Board } from "@/types/board.types";
import { ApiPictogram, Pictogram } from "@/types/pictogram.types";
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
    const apiBoards = await this.request(`${API_BASE_URL}/boards`);

    return apiBoards.map((board: ApiBoard) => boardAdapter.toBoard(board));
  }

  async getBoardById(uuid: string): Promise<Board> {
    const apiBoard = await this.request(`${API_BASE_URL}/boards/${uuid}`);

    return boardAdapter.toBoard(apiBoard);
  }

  async getBoardPictograms(uuid: string): Promise<Pictogram[]> {
    const apiPictograms = await this.request(
      `${API_BASE_URL}/boards/${uuid}/pictograms`,
    );
    return apiPictograms.map((pic: ApiPictogram) =>
      boardAdapter.toPictogram(pic),
    );
  }
}
