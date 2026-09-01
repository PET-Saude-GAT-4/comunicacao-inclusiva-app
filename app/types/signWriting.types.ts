export interface SignWriting {
  id: number;
  uuid: string;
  description: string;
  imageSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiSignWriting {
  id: number;
  uuid: string;
  description: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}
