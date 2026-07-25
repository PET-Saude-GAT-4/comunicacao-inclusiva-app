import { Speciality } from "@/types/speciality.types";

export const specialityMock: Speciality[] = [
  {
    id: 1,
    name: "Cardiologia",
    code: "CAR",
    professionId: 1, // Médico
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Pediatria",
    code: "PED",
    professionId: 1, // Médico
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Pediatria Neonatal",
    code: "PED-NEO",
    professionId: 2, // Enfermeiro
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Odontopediatria",
    code: "ODO-PED",
    professionId: 3, // Dentista
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
