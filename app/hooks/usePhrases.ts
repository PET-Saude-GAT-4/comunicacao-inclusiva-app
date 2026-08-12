import { PHRASES_CACHE_KEY } from "@/constants/cache";
import { phrasesMock } from "@/mocks/phraseMock";
import { Phrase } from "@/types/phrase.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function usePhrases() {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadPhrases = async () => {
    setIsError(false);

    try {
      const cacheData = await AsyncStorage.getItem(PHRASES_CACHE_KEY);

      if (cacheData) {
        setPhrases(JSON.parse(cacheData));
      } else {
        setPhrases(phrasesMock);
      }
    } catch (error) {
      console.log("Failed to load phrases from cache. Using Mock.");
      setPhrases(phrasesMock);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPhrases();
  }, []);

  return { phrases, isLoading, isError, refetch: loadPhrases };
}
