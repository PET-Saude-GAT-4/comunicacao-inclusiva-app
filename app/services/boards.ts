import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiBoard, Board } from "@/types/board.types";
import { ApiBoardItem, BoardItem } from "@/types/item.types";
import { ApiPictogram, Pictogram } from "@/types/pictogram.types";
import { request } from "@/utils/apiUtils";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class BoardService {
  async getBoards(): Promise<Board[]> {
    const response = await request(`${API_BASE_URL}/public/boards`);

    return response.boards.map((board: ApiBoard) =>
      boardAdapter.toBoard(board),
    );
  }

  async getBoardById(uuid: string): Promise<Board> {
    const response = await request(`${API_BASE_URL}/public/boards/${uuid}`);

    return boardAdapter.toBoard(response.board);
  }

  async getBoardItems(uuid: string): Promise<BoardItem[]> {
    const response = await request(
      `${API_BASE_URL}/public/boards/${uuid}/slots`,
    );
    return response.pictograms.map((slot: ApiBoardItem) =>
      boardAdapter.toBoardItem(slot),
    );
  }

  async getNextBoards(uuid: string): Promise<Board[]> {
    const response = await request(
      `${API_BASE_URL}/public/boards/${uuid}/next-boards`,
    );

    // The API already returns the boards in the order they should be suggested.
    return response.boards.map((board: ApiBoard) =>
      boardAdapter.toBoard(board),
    );
  }
}
