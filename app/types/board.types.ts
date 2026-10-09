import { ApiPictogram, Pictogram } from "./pictogram.types";

// Mirrors BOARD_TYPES in the api repo.
export const BOARD_TYPES = ["common", "emergency"] as const;

export type BoardType = (typeof BOARD_TYPES)[number];

export interface Board {
  uuid: string;
  title: string;
  type: BoardType;
  representativePictogram: Pictogram;
  termCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Wire format matching the API's board response. The public endpoints also
 * return `authorUuid` and `publishedAt`, which the app has no use for.
 */
export interface ApiBoard {
  uuid: string;
  title: string;
  type: BoardType;
  representativePictogram: ApiPictogram;
  termCount: number;
  createdAt: string;
  updatedAt: string;
}
