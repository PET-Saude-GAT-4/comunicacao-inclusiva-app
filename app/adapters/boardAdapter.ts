import { ApiBoard, Board } from "@/types/board.types";
import { ApiPictogram, Pictogram } from "@/types/pictogram.types";
import { buildFileUrl } from "@/utils/files";


export const boardAdapter = {
  toPictogram(apiData: ApiPictogram): Pictogram {
    return {
      id: apiData.id,
      uuid: apiData.uuid,
      description: apiData.description,
      imageSource: buildFileUrl(apiData.fileUuid),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },

  toBoard(apiData: ApiBoard): Board {
    return {
      id: apiData.id,
      uuid: apiData.uuid,
      title: apiData.title,
      representativePictogram: this.toPictogram(apiData.representativePictogram),
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  }
};
