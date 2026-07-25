import { Profession } from "@/types/Profession.types";

export const professionMock: Profession[] = [
  {
    id: 1,
    name: "Médico",
    code: "MED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Enfermeiro",
    code: "ENF",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Dentista",
    code: "DEN",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Fonoaudiólogo",
    code: "FON",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
