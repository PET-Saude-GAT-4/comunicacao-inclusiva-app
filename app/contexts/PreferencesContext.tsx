import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

export type DisplayMode = "pictogram" | "signWriting";

const STORAGE_KEY = "@preferences_display_mode";

interface PreferencesContextData {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
  toggleDisplayMode: () => void;
}

export const PreferencesContext = createContext({} as PreferencesContextData);

interface Props {
  children: ReactNode;
}

export function PreferencesProvider({ children }: Props) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("pictogram");
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleDisplayMode = () => {
    setDisplayMode((prev) =>
      prev === "pictogram" ? "signWriting" : "pictogram",
    );
  };

  useEffect(() => {
    async function loadSavedMode() {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);

        if (data) {
          setDisplayMode(JSON.parse(data));
        }
      } catch (error) {
        console.log("Failed to load display mode from storage.");
      } finally {
        setIsLoaded(true);
      }
    }

    loadSavedMode();
  }, []);

  useEffect(() => {
    // Avoid overwriting stored data with the initial empty state
    // before the first load completes.
    if (!isLoaded) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(displayMode));
  }, [displayMode, isLoaded]);

  return (
    <PreferencesContext.Provider
      value={{
        displayMode,
        setDisplayMode,
        toggleDisplayMode,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
