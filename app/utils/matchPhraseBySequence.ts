import { Phrase } from "@/types/phrase.types";
import { Term } from "@/types/term.types";

/**
 * The phrase whose term sequence is exactly the one being composed, or null.
 *
 * Equality is ordered and total: a phrase that is merely a prefix of what is in
 * the visor does not match. That is what lets a longer phrase take over as
 * terms are added — [cabeça, mal-estar] matches one phrase, and adding a third
 * term hands the match to another or to none.
 *
 * Both sides identify a term by its vocabulary uuid: `boardAdapter.toTerm`
 * stores `termUuid` rather than the placement uuid, so a term tapped on a board
 * and the same term inside a phrase compare equal.
 */
export function matchPhraseBySequence(
  phrases: Phrase[],
  selectedTerms: Term[],
): Phrase | null {
  if (selectedTerms.length === 0) return null;

  const sequence = selectedTerms.map((term) => term.uuid);

  const candidates = phrases.filter(
    (phrase) =>
      phrase.terms.length === sequence.length &&
      phrase.terms.every((term, index) => term.uuid === sequence[index]),
  );

  if (candidates.length === 0) return null;

  // Nothing in the API stops two phrases from sharing a sequence, so the winner
  // is decided here instead of being left to whatever order the cache happens
  // to hold. An unlisted phrase wins, because it was written to be matched,
  // while a listed one is also something people browse for. Between two of the
  // same kind, the older wins.
  return candidates.reduce((best, phrase) => {
    if (phrase.listedInLibrary !== best.listedInLibrary) {
      return phrase.listedInLibrary ? best : phrase;
    }
    return phrase.createdAt < best.createdAt ? phrase : best;
  });
}
