export interface Pictogram {
  uuid: string;
  description: string;
  imageSource: string;
  createdAt: string;
  updatedAt: string;
}

/** Wire format matching the API's PictogramResponse */
export interface ApiPictogram {
  uuid: string;
  description: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}
