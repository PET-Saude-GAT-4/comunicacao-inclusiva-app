import { formatBodyMapRecord, formatPainRecord } from "@/utils/interactionText";

describe("formatPainRecord", () => {
  it("shows the level 1-based next to the scale size", () => {
    expect(
      formatPainRecord({ level: 0, levelCount: 6, severity: "Sem dor" }),
    ).toBe("Dor relatada: Sem dor (1/6)");
  });

  it("shows the top level as levelCount", () => {
    expect(
      formatPainRecord({ level: 5, levelCount: 6, severity: "Insuportável" }),
    ).toBe("Dor relatada: Insuportável (6/6)");
  });
});

describe("formatBodyMapRecord", () => {
  it("joins the region labels with commas", () => {
    expect(
      formatBodyMapRecord({
        regions: [
          { slug: "head", label: "Cabeça" },
          { slug: "chest", label: "Peito" },
        ],
      }),
    ).toBe("Dor: Cabeça, Peito");
  });

  it("leaves the list empty when no region was chosen", () => {
    expect(formatBodyMapRecord({ regions: [] })).toBe("Dor: ");
  });
});
