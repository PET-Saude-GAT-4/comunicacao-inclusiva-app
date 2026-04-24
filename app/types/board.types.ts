import { ImageSourcePropType } from "react-native";
import { Pictogram } from "./pictogram.types";

export interface BoardPictogram {
  order: number;
  pictogram: Pictogram;
}

export interface Board {
  id: number;
  title: string;
  imageUrl: ImageSourcePropType;
  items: BoardPictogram[];
}
