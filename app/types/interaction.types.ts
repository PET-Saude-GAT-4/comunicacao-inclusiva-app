import { Pictogram } from "./pictogram.types";

export type SpeakerType = "patient" | "caregiver";
export type InteractionType = "pictogram" | "text" | "confusion";

export interface InteractionEntry {
    id: string;
    speaker: SpeakerType;
    type: InteractionType;
    content: string | Pictogram[];
    timestamp: string;
}
