import { specialityAdapter } from "@/adapters/specialityAdapter";
import { ApiSpeciality } from "@/types/speciality.types";

const wire: ApiSpeciality = {
  id: 8,
  name: "Pediatria",
  code: "PED",
  professionId: 3,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
};

describe("specialityAdapter.toSpeciality", () => {
  it("maps every field when professionCode is present", () => {
    const withCode = { ...wire, professionCode: "MED" };

    expect(specialityAdapter.toSpeciality(withCode)).toEqual(withCode);
  });

  it("leaves professionCode undefined when the API omits it", () => {
    const speciality = specialityAdapter.toSpeciality(wire);

    expect(speciality.professionCode).toBeUndefined();
    expect(speciality.professionId).toBe(3);
  });
});
