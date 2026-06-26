import { Pictogram } from "./pictogram.types";

export type SpeakerType = "patient" | "professional";
export type InteractionType = "pictogram" | "text";

export interface InteractionEntry {
    id: string;
    speaker: SpeakerType;
    type: InteractionType;
    content: string | Pictogram[];
    timestamp: string;
    understood: boolean;
}
