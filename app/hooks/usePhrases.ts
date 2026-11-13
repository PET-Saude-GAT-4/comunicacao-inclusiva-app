import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMemo } from "react";

import { PHRASES_CACHE_KEY } from "@/constants/cache";
import { useCachedValue } from "@/hooks/useCachedValue";
import { phrasesMock } from "@/mocks/phraseMock";
import { Phrase } from "@/types/phrase.types";

// The cache holds whatever the app wrote the last time it synced, so a phrase
// stored before `listedInLibrary` existed carries no value for it. Reading that
// as listed is what keeps a device that has not synced since from hiding its
// whole library.
const withListingDefault = (cached: Phrase[]): Phrase[] =>
  cached.map((phrase) => ({
    ...phrase,
    listedInLibrary: phrase.listedInLibrary ?? true,
  }));

type CachedPhrases = { phrases: Phrase[]; isError: boolean };

const NO_PHRASES: CachedPhrases = { phrases: [], isError: false };

async function readPhrases(cacheKey: string): Promise<CachedPhrases> {
  try {
    const cacheData = await AsyncStorage.getItem(cacheKey);

    return {
      phrases: cacheData
        ? withListingDefault(JSON.parse(cacheData))
        : phrasesMock,
      isError: false,
    };
  } catch {
    console.log("Failed to load phrases from cache. Using Mock.");
    return { phrases: phrasesMock, isError: true };
  }
}

export function usePhrases() {
  const { value, isLoading } = useCachedValue(
    PHRASES_CACHE_KEY,
    readPhrases,
    NO_PHRASES,
  );
  const { phrases, isError } = value;

  // The screens that let someone browse show only the listed phrases, while the
  // term-sequence matcher needs every cached one. Both lists come from here, so
  // no caller has to remember which of the two it is entitled to.
  const listedPhrases = useMemo(
    () => phrases.filter((phrase) => phrase.listedInLibrary),
    [phrases],
  );

  return { phrases, listedPhrases, isLoading, isError };
}
