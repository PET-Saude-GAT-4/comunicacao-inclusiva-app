import { DisplayMode } from "@/contexts/PreferencesContext";
import { Term } from "@/types/term.types";

export type SpeakerType = "patient" | "professional";
export type InteractionType = "term" | "text";

export interface InteractionEntry {
  id: string;
  speaker: SpeakerType;
  type: InteractionType;
  content: string | Term[];
  timestamp: string;
  understood: boolean;
  /** The display mode active when this interaction was sent. */
  displayMode?: DisplayMode;
}
