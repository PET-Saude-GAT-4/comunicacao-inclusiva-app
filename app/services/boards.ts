import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiBoard, Board } from "@/types/board.types";
import { ApiPictogram, Pictogram } from "@/types/pictogram.types";
import { fetchJson } from "@/utils/apiUtils";
import Constants from "expo-constants";
const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class BoardService {
  async getBoards(): Promise<Board[]> {
    const response = await fetchJson(`${API_BASE_URL}/public/boards`);

    return response.boards.map((board: ApiBoard) => boardAdapter.toBoard(board));
  }

  async getBoardById(uuid: string): Promise<Board> {
    const response = await fetchJson(`${API_BASE_URL}/public/boards/${uuid}`);

    return boardAdapter.toBoard(response.board);
  }

  async getBoardPictograms(uuid: string): Promise<Pictogram[]> {
    const response = await fetchJson(
      `${API_BASE_URL}/public/boards/${uuid}/pictograms`,
    );
    return response.pictograms.map((pic: ApiPictogram) =>
      boardAdapter.toPictogram(pic),
    );
  }
}
