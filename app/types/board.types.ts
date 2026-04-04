import { Pictogram } from "./pictogram.types";

export interface BoardPictogram {
  order: number;
  pictogram: Pictogram;
}

export interface Board {
  id: number;
  title: string;
  items: BoardPictogram[];
}
