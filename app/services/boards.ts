import { boardAdapter } from "@/adapters/boardAdapter";
import { ApiBoard, Board } from "@/types/board.types";
import { ApiTerm, Term } from "@/types/term.types";
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

  async getBoardTerms(uuid: string): Promise<Term[]> {
    const response = await request(
      `${API_BASE_URL}/public/boards/${uuid}/terms`,
    );
    // The API already returns the terms in the order they should be shown.
    return response.terms.map((term: ApiTerm) => boardAdapter.toTerm(term));
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
