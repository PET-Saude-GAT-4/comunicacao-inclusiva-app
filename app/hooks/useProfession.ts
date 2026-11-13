import AsyncStorage from "@react-native-async-storage/async-storage";

import { PROFESSIONS_CACHE_KEY } from "@/constants/cache";
import { useCachedValue } from "@/hooks/useCachedValue";
import { professionMock } from "@/mocks/professionMock";
import { Profession } from "@/types/profession.types";

const NO_PROFESSIONS: Profession[] = [];

async function readProfessions(cacheKey: string): Promise<Profession[]> {
  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(cacheKey);

    // 2. If cache is completely empty, fall back to Mock
    return cacheData ? JSON.parse(cacheData) : professionMock;
  } catch {
    console.log("Failed to load professions from cache. Using Mock.");
    return professionMock;
  }
}

export function useProfessions() {
  const { value: professions, isLoading } = useCachedValue(
    PROFESSIONS_CACHE_KEY,
    readProfessions,
    NO_PROFESSIONS,
  );

  return { professions, isLoading };
}
