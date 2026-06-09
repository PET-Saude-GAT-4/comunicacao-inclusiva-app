import { SpeakerType } from "./interaction.types";

export type MessageEntry = 
  | {
      id: string;
      speaker: SpeakerType;
      type: "pictogram";
      pictograms: string[];
      timestamp: string;
    }
  | {
      id: string;
      speaker: SpeakerType;
      type: "text";
      content: string;
      timestamp: string;
    };
