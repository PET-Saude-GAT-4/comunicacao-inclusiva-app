import { professionAdapter } from "@/adapters/professionAdapter";
import { specialityAdapter } from "@/adapters/specialityAdapter";
import { ApiProfession, Profession } from "@/types/Profession.types";
import { ApiSpeciality, Speciality } from "@/types/speciality.types";
import { fetchJson } from "@/utils/apiUtils";
import Constants from "expo-constants";

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;

export class ProfessionService{

    async getProfessions(): Promise<Profession[]> {
        const response = await fetchJson(`${API_BASE_URL}/public/professions`);

        return response.professions.map((profession: ApiProfession) =>
            professionAdapter.toProfession(profession),
        );
    }

    async getSpecilities(professionCode: string): Promise<Speciality[]> {
        console.log(professionCode);
        const response = await fetchJson(`${API_BASE_URL}/public/professions/${professionCode}/specialities`);
        
        const list: ApiSpeciality[] = Array.isArray(response)
          ? response
          : response.specialities || response.specilities || response.content || [];

        return list.map((speciality: ApiSpeciality) =>
            specialityAdapter.toSpeciality(speciality),
        );
    }
}
