import { ApiBoard, Board } from "./board.types";

/**
 * One of the five Quick Emergency levels and the board shown at it. Level 1 is
 * the most urgent.
 */
export interface TriageStep {
  uuid: string;
  level: number;
  board: Board;
  createdAt: string;
  updatedAt: string;
}

/**
 * Wire format matching the API's triage step response. The board comes in the
 * same shape as every other board response.
 */
export interface ApiTriageStep {
  uuid: string;
  level: number;
  board: ApiBoard;
  createdAt: string;
  updatedAt: string;
}
