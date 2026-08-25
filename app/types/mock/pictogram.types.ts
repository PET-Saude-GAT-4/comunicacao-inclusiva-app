import { ImageSourcePropType } from "react-native";

export interface ModalityImage {
  id: number;
  uuid: string;
  description: string;
  imageSource: ImageSourcePropType | string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardItem {
  id: number;
  uuid: string;
  description: string; // Descrição do Slot
  pictogram: ModalityImage;
  signWriting: ModalityImage;
}
