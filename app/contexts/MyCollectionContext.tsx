import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

const STORAGE_KEY = "@saved_boards";

interface MyCollectionContextData {
  savedUuids: string[];

  isSaved: (uuid: string) => boolean;

  toggleSaved: (uuid: string) => void;
}

export const MyCollectionContext = createContext({} as MyCollectionContextData);

interface Props {
  children: ReactNode;
}

export function MyCollectionProvider({ children }: Props) {
  const [savedUuids, setSavedUuids] = useState<string[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadSavedUuids() {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        if (data) {
          setSavedUuids(JSON.parse(data));
        }
      } catch (error) {
        console.log("Failed to load saved boards from storage.");
      } finally {
        setIsLoaded(true);
      }
    }

    loadSavedUuids();
  }, []);

  useEffect(() => {
    // Avoid overwriting stored data with the initial empty state
    // before the first load completes.
    if (!isLoaded) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedUuids));
  }, [savedUuids, isLoaded]);

  function isSaved(uuid: string) {
    return savedUuids.includes(uuid);
  }

  function toggleSaved(uuid: string) {
    setSavedUuids((prev) =>
      prev.includes(uuid)
        ? prev.filter((saved) => saved !== uuid)
        : [...prev, uuid],
    );
  }

  return (
    <MyCollectionContext.Provider
      value={{
        savedUuids,
        isSaved,
        toggleSaved,
      }}
    >
      {children}
    </MyCollectionContext.Provider>
  );
}
