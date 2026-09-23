import {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

import { InteractionEntry } from "@/types/interaction.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "@active_session";

type Speaker = "patient" | "professional";

interface SessionCache {
    isInConsultation: boolean;
    startedAt: string;
    interactions: InteractionEntry[];
}

interface SessionContextData {
    isInConsultation: boolean;

    currentSpeaker: Speaker;

    interactions: InteractionEntry[];

    startedAt: Date | null;

    closedAt: Date | null;

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
    ] = useState<Speaker>("professional");

    const [
        interactions,
        setInteractions,
    ] = useState<InteractionEntry[]>([]);

    const [
        startedAt,
        setStartedAt,
    ] = useState<Date | null>(null);

    const [
        closedAt,
        setClosedAt,
    ] = useState<Date | null>(null);

    // Restore session from cache on app launch
    useEffect(() => {
        async function restoreSession() {
            try {
                const raw = await AsyncStorage.getItem(CACHE_KEY);
                if (!raw) return;

                const cached: SessionCache = JSON.parse(raw);
                if (!cached.isInConsultation) return;

                setIsInConsultation(true);
                setStartedAt(new Date(cached.startedAt));
                setInteractions(cached.interactions ?? []);
                console.log("Sessão restaurada do cache:", cached.interactions.length, "interações");
            } catch (e) {
                console.warn("Erro ao restaurar sessão:", e);
            }
        }

        restoreSession();
    }, []);

    async function startConsultation() {
        const now = new Date();
        setIsInConsultation(true);
        setStartedAt(now);
        setInteractions([]);
        setClosedAt(null);

        //add consultation in cache
        try {
            const cache: SessionCache = {
                isInConsultation: true,
                startedAt: now.toISOString(),
                interactions: [],
            };
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
        } catch (e) {
            console.warn("Erro ao salvar sessão no cache:", e);
        }

        console.log("Atendimento iniciado");
    }

    async function endConsultation() {
        setIsInConsultation(false);
        setClosedAt(new Date());
        console.log("Atendimento finalizado");
        console.log("Interações da sessão:\n", JSON.stringify(interactions, null, 2));

        try {
            await AsyncStorage.removeItem(CACHE_KEY);
        } catch (e) {
            console.warn("Erro ao remover sessão do cache:", e);
        }

        setInteractions([]);
    }

    async function addInteraction(
        interaction: InteractionEntry
    ) {
        const updated = [...interactions, interaction];
        setInteractions(updated);

        // Keep cache in sync after every new interaction
        try {
            const raw = await AsyncStorage.getItem(CACHE_KEY);
            if (!raw) return;

            const cached: SessionCache = JSON.parse(raw);
            cached.interactions = updated;
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cached));
        } catch (e) {
            console.warn("Erro ao atualizar cache de interações:", e);
        }
    }

    return (
        <SessionContext.Provider
            value={{
                isInConsultation,
                currentSpeaker,
                interactions,
                startedAt,
                closedAt,
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