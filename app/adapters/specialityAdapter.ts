import { ApiSpeciality, Speciality } from "@/types/speciality.types";

export const specialityAdapter = {
  toSpeciality(apiData: ApiSpeciality): Speciality {
    return {
      id: apiData.id,
      name: apiData.name,
      code: apiData.code,
      professionId: apiData.professionId,
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },
};
