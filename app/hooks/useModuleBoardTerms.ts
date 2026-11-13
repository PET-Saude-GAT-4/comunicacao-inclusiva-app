import AsyncStorage from "@react-native-async-storage/async-storage";

import { boardTermsCacheKey } from "@/constants/cache";
import { bundledEmergencyBoardTerms } from "@/content/emergency";
import { useCachedValue } from "@/hooks/useCachedValue";
import { Term } from "@/types/term.types";

const NO_TERMS: Term[] = [];

async function readModuleTerms(uuid: string): Promise<Term[]> {
  const bundled = bundledEmergencyBoardTerms[uuid] || [];

  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(boardTermsCacheKey(uuid));

    if (cacheData) {
      const parsed: Term[] = JSON.parse(cacheData);
      return parsed.length > 0 ? parsed : bundled;
    }

    // 2. If not in cache, fall back to the bundled content
    return bundled;
  } catch {
    console.log(
      `Failed to load cache for UUID: ${uuid}. Using bundled content.`,
    );
    return bundled;
  }
}

export function useModuleBoardTerms(uuid: string) {
  const { value: terms, isLoading } = useCachedValue(
    uuid,
    readModuleTerms,
    NO_TERMS,
  );

  return { terms, isLoading };
}
