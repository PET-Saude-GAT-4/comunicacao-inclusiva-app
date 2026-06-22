import { ApiPictogram, Pictogram } from "./pictogram.types";

export interface Board {
  id: number;
  uuid: string;
  title: string;
  representativePictogram: Pictogram;
  pictogramCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiBoard {
  id: number;
  uuid: string;
  title: string;
  representativePictogram: ApiPictogram;
  pictogramCount: number;
  createdAt: string;
  updatedAt: string;
}
