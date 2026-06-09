import { SpeakerType } from "./interaction.types";

export interface MessageEntry {
    id: string;
    speaker: SpeakerType;
    type: "pictogram";
    pictograms: string[];
    timestamp: string;
}
