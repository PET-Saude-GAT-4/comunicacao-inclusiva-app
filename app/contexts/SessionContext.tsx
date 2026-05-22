import {
    createContext,
    ReactNode,
    useState,
} from "react";

import { InteractionEntry } from "@/types/interaction.types";

type Speaker = "patient" | "professional";

interface SessionContextData {
    isInConsultation: boolean;

    currentSpeaker: Speaker;

    interactions: InteractionEntry[];

    startConsultation: () => void;

    endConsultation: () => void;

    setCurrentSpeaker: (speaker: Speaker) => void;

    addInteraction: (
        interaction: InteractionEntry
    ) => void;
}

export const SessionContext =
    createContext({} as SessionContextData);

interface Props {
    children: ReactNode;
}

export function SessionProvider({
    children,
}: Props) {

    const [
        isInConsultation,
        setIsInConsultation,
    ] = useState(false);

    const [
        currentSpeaker,
        setCurrentSpeaker,
    ] = useState<Speaker>("patient");

    const [
        interactions,
        setInteractions,
    ] = useState<InteractionEntry[]>([]);

    function startConsultation() {
        setIsInConsultation(true);
    }

    function endConsultation() {
        setIsInConsultation(false);
        setInteractions([]);
    }

    function addInteraction(
        interaction: InteractionEntry
    ) {
        setInteractions((prev) => [
            ...prev,
            interaction,
        ]);
    }

    return (
        <SessionContext.Provider
            value={{
                isInConsultation,
                currentSpeaker,
                interactions,
                startConsultation,
                endConsultation,
                setCurrentSpeaker,
                addInteraction,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}