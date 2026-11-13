import { term } from "@test/fixtures";

import { resolveTermDisplay } from "@/utils/resolveTermDisplay";

describe("resolveTermDisplay", () => {
  const dor = term("dor", "dor de cabeça");

  it("uses the pictogram image in pictogram mode", () => {
    expect(resolveTermDisplay(dor, "pictogram").imageSource).toBe(
      "pic/dor.png",
    );
  });

  it("uses the sign writing image in signWriting mode", () => {
    expect(resolveTermDisplay(dor, "signWriting").imageSource).toBe(
      "sw/dor.png",
    );
  });

  it.each(["pictogram", "signWriting"] as const)(
    "upper-cases the label in %s mode",
    (mode) => {
      expect(resolveTermDisplay(dor, mode).label).toBe("DOR DE CABEÇA");
    },
  );
});
