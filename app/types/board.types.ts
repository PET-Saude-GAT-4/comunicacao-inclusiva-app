import { ApiPictogram, Pictogram } from "./pictogram.types";

export interface Board {
  id: number;
  uuid: string;
  title: string;
  representativePictogram: Pictogram;
  createdAt: string;
  updatedAt: string;
}

export interface ApiBoard {
  id: number;
  uuid: string;
  title: string;
  representativePictogram: ApiPictogram;
  createdAt: string;
  updatedAt: string;
}
