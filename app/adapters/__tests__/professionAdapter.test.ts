import { professionAdapter } from "@/adapters/professionAdapter";

describe("professionAdapter.toProfession", () => {
  it("maps every field", () => {
    const wire = {
      id: 3,
      name: "Enfermagem",
      code: "ENF",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-02T00:00:00.000Z",
    };

    expect(professionAdapter.toProfession(wire)).toEqual(wire);
  });
});
