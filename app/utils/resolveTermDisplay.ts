import { DisplayMode } from "@/contexts/PreferencesContext";
import { Term } from "@/types/term.types";

export interface TermDisplay {
  imageSource: string;
  label: string;
}

/**
 * Single source of truth for display resolution.
 * Given a Term and the current display mode, returns the correct
 * image URI and label to show on any surface.
 *
 * Board cover images (category chips, board cards) keep using
 * `board.representativePictogram` directly — they are not Terms.
 */
export function resolveTermDisplay(
  term: Term,
  mode: DisplayMode,
): TermDisplay {
  return {
    imageSource:
      mode === "signWriting"
        ? term.signWriting.imageSource as string
        : term.pictogram.imageSource as string,
    label: term.description.toUpperCase(),
  };
}
