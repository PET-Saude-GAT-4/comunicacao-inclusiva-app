import { PHRASES_CACHE_KEY } from "@/constants/cache";
import { phrasesMock } from "@/mocks/phraseMock";
import { Phrase } from "@/types/phrase.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

// The cache holds whatever the app wrote the last time it synced, so a phrase
// stored before `listedInLibrary` existed carries no value for it. Reading that
// as listed is what keeps a device that has not synced since from hiding its
// whole library.
const withListingDefault = (cached: Phrase[]): Phrase[] =>
  cached.map((phrase) => ({
    ...phrase,
    listedInLibrary: phrase.listedInLibrary ?? true,
  }));

export function usePhrases() {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadPhrases = async () => {
    setIsError(false);

    try {
      const cacheData = await AsyncStorage.getItem(PHRASES_CACHE_KEY);

      if (cacheData) {
        const parsed = JSON.parse(cacheData);
        if (parsed.length > 0) {
          setPhrases(withListingDefault(parsed));
        } else {
          setPhrases(phrasesMock);
        }
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

  // The screens that let someone browse show only the listed phrases, while the
  // term-sequence matcher needs every cached one. Both lists come from here, so
  // no caller has to remember which of the two it is entitled to.
  const listedPhrases = useMemo(
    () => phrases.filter((phrase) => phrase.listedInLibrary),
    [phrases],
  );

  return { phrases, listedPhrases, isLoading, isError, refetch: loadPhrases };
}
