export interface Pictogram {
  id: number;
  uuid: string;
  description: string;
  imageSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPictogram {
  id: number;
  uuid: string;
  description: string;
  fileUuid: string;
  createdAt: string;
  updatedAt: string;
}
