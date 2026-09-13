export interface SignWriting {
  uuid: string;
  description: string;
  imageSource: string;
  createdAt: string;
  updatedAt: string;
}

/** Wire format matching the API's SignWritingResponse */
export interface ApiSignWriting {
  uuid: string;
  description: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}
