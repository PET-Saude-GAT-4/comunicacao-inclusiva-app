import { phraseAdapter } from "@/adapters/phraseAdapter";
import { ApiPhrase } from "@/types/phrase.types";

import { apiPhrase, apiTerm } from "../../test/fixtures";

describe("phraseAdapter.toPhrase", () => {
  it("keeps the terms in the order the API sent them", () => {
    const phrase = phraseAdapter.toPhrase(
      apiPhrase({
        terms: [
          apiTerm({ termUuid: "b", order: 0 }),
          apiTerm({ termUuid: "a", order: 1 }),
          apiTerm({ termUuid: "c", order: 2 }),
        ],
      }),
    );

    expect(phrase.terms.map((term) => term.uuid)).toEqual(["b", "a", "c"]);
  });

  it("treats missing terms as an empty list", () => {
    const wire = { ...apiPhrase(), terms: undefined } as unknown as ApiPhrase;

    expect(phraseAdapter.toPhrase(wire).terms).toEqual([]);
  });

  it.each([true, false])("passes listedInLibrary=%s through", (listed) => {
    const phrase = phraseAdapter.toPhrase(
      apiPhrase({ listedInLibrary: listed }),
    );

    expect(phrase.listedInLibrary).toBe(listed);
  });
});
