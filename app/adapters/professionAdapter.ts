import { ApiProfession, Profession } from "@/types/Profession.types";

export const professionAdapter = {
  toProfession(apiData: ApiProfession): Profession {
    return {
      id: apiData.id,
      name: apiData.name,
      code: apiData.code,
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
    };
  },
};
