import { ApiPictogram, Pictogram } from "./pictogram.types";

export interface Board {
  uuid: string;
  title: string;
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
  representativePictogram: ApiPictogram;
  termCount: number;
  createdAt: string;
  updatedAt: string;
}
