/**
 * Wire format matching the API's SpecialityOutput. The API identifies the owning
 * profession by `professionId` only; `professionCode` exists so the offline
 * mock, which is filtered by code, can carry it.
 */
export type ApiSpeciality = {
  id: number;
  name: string;
  code: string;
  professionId: number;
  professionCode?: string;
  createdAt: string;
  updatedAt: string;
};

export type Speciality = {
  id: number;
  name: string;
  code: string;
  professionId: number;
  professionCode?: string;
  createdAt: string;
  updatedAt: string;
};
