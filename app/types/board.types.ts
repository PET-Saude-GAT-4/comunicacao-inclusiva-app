import { Pictogram } from "./pictogram.types";

export interface Board {
  id: number;
  uuid: string;
  title: string;
  representativePictogram: Pictogram;
  createdAt: string;
  updatedAt: string;
}
