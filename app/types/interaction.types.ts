import { DisplayMode } from "@/contexts/PreferencesContext";
import { Term } from "@/types/term.types";

export type SpeakerType = "patient" | "professional";
export type InteractionType = "term" | "text" | "painScale" | "bodyMap";

export interface PainContent {
  level: number;
  levelCount: number;
  severity: string;
}

export interface BodyMapContent {
  regions: { slug: string; label: string }[];
}

interface BaseInteraction {
  id: string;
  speaker: SpeakerType;
  timestamp: string;
  /** The display mode active when this interaction was sent. */
  displayMode?: DisplayMode;
}

/**
 * The pain and body-map variants pin `understood` to `true`: they are posted
 * straight from their own panel and never pass through the
 * "entendi / tenho dúvida" screen, so no comprehension check ever runs.
 */
export type InteractionEntry =
  | (BaseInteraction & {
      type: "text";
      content: string;
      understood: boolean;
    })
  | (BaseInteraction & {
      type: "term";
      content: Term[];
      understood: boolean;
    })
  | (BaseInteraction & {
      type: "painScale";
      content: PainContent;
      understood: true;
    })
  | (BaseInteraction & {
      type: "bodyMap";
      content: BodyMapContent;
      understood: true;
    });
