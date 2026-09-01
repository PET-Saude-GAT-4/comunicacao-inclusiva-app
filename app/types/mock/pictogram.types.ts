import { ImageSourcePropType } from "react-native";

export interface ModalityImage {
  id: number;
  uuid?: string;
  description: string;
  imageSource?: ImageSourcePropType | string;
  imageUrl?: ImageSourcePropType | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Term {
  id: number;
  uuid: string;
  description: string; // Descrição do Term
  pictogram: ModalityImage;
  signWriting: ModalityImage;
}

export type BoardItem = Term;
export type Pictogram = ModalityImage;
