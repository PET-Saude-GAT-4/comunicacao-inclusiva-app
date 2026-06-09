import {
    createContext,
    ReactNode,
    useState,
} from "react";

import { InteractionEntry } from "@/types/interaction.types";
import { MessageEntry } from "@/types/message.types";

type Speaker = "patient" | "professional";

interface SessionContextData {
    isInConsultation: boolean;

    currentSpeaker: Speaker;

    interactions: InteractionEntry[];

    messages: MessageEntry[];

    startedAt: Date | null;

    closedAt: Date | null;

    startConsultation: () => void;

    endConsultation: () => void;

    setCurrentSpeaker: (speaker: Speaker) => void;

    addInteraction: (
        interaction: InteractionEntry
    ) => void;

    setMessages: React.Dispatch<React.SetStateAction<MessageEntry[]>>;
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

    const [
        messages,
        setMessages,
    ] = useState<MessageEntry[]>([]);

    const [
        startedAt,
        setStartedAt,
    ] = useState<Date | null>(null);

    const [
        closedAt,
        setClosedAt,
    ] = useState<Date | null>(null);

    function startConsultation() {
        setIsInConsultation(true);
        setStartedAt(new Date());
        setMessages([]);
        setInteractions([]);
        setClosedAt(null);
        console.log("Atendimento iniciado");
    }

    function endConsultation() {
        setIsInConsultation(false);
        setInteractions([]);
        setClosedAt(new Date());
        console.log("Atendimento finalizado");
        console.log("Mensagens da sessão:\n", JSON.stringify(messages, null, 2));
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
                messages,
                startedAt,
                closedAt,
                startConsultation,
                endConsultation,
                setCurrentSpeaker,
                addInteraction,
                setMessages,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}