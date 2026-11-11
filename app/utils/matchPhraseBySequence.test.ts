import { matchPhraseBySequence } from "@/utils/matchPhraseBySequence";

import { phrase, term } from "../../test/fixtures";

const selection = (...uuids: string[]) => uuids.map((uuid) => term(uuid));

describe("matchPhraseBySequence", () => {
  it("returns null when nothing is selected", () => {
    expect(matchPhraseBySequence([phrase("p", [])], [])).toBeNull();
  });

  it("matches the phrase with exactly the selected sequence", () => {
    const target = phrase("target", ["cabeca", "mal-estar"]);

    const match = matchPhraseBySequence(
      [phrase("other", ["febre"]), target],
      selection("cabeca", "mal-estar"),
    );

    expect(match?.uuid).toBe("target");
  });

  it("does not match a phrase that is only a prefix of the selection", () => {
    const match = matchPhraseBySequence(
      [phrase("short", ["cabeca", "mal-estar"])],
      selection("cabeca", "mal-estar", "febre"),
    );

    expect(match).toBeNull();
  });

  it("does not match when the selection is only a prefix of the phrase", () => {
    const match = matchPhraseBySequence(
      [phrase("long", ["cabeca", "mal-estar", "febre"])],
      selection("cabeca", "mal-estar"),
    );

    expect(match).toBeNull();
  });

  it("takes order into account", () => {
    const match = matchPhraseBySequence(
      [phrase("p", ["cabeca", "mal-estar"])],
      selection("mal-estar", "cabeca"),
    );

    expect(match).toBeNull();
  });

  it("prefers an unlisted phrase over a listed one with the same sequence", () => {
    const match = matchPhraseBySequence(
      [
        phrase("listed", ["a"], {
          listedInLibrary: true,
          createdAt: "2025-01-01T00:00:00.000Z",
        }),
        phrase("unlisted", ["a"], {
          listedInLibrary: false,
          createdAt: "2026-01-01T00:00:00.000Z",
        }),
      ],
      selection("a"),
    );

    expect(match?.uuid).toBe("unlisted");
  });

  it("prefers the older phrase between two of the same kind", () => {
    const match = matchPhraseBySequence(
      [
        phrase("newer", ["a"], { createdAt: "2026-03-01T00:00:00.000Z" }),
        phrase("older", ["a"], { createdAt: "2026-01-01T00:00:00.000Z" }),
      ],
      selection("a"),
    );

    expect(match?.uuid).toBe("older");
  });
});
