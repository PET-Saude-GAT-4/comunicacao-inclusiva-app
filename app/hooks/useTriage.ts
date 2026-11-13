import AsyncStorage from "@react-native-async-storage/async-storage";

import { TRIAGE_STEPS_CACHE_KEY } from "@/constants/cache";
import { bundledTriageSteps } from "@/content/emergency";
import { useCachedValue } from "@/hooks/useCachedValue";
import { TriageStep } from "@/types/triage.types";

const NO_STEPS: TriageStep[] = [];

async function readTriageSteps(cacheKey: string): Promise<TriageStep[]> {
  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(cacheKey);
    const parsed: TriageStep[] = cacheData ? JSON.parse(cacheData) : [];

    if (parsed.length > 0) {
      // The API sends them in level order already; sorting keeps that true
      // whatever wrote the cache.
      return [...parsed].sort((a, b) => a.level - b.level);
    }

    // 2. Never synced, or no level filled yet: fall back to the bundled levels
    return bundledTriageSteps;
  } catch {
    console.log(
      "Failed to load triage steps from cache. Using bundled content.",
    );
    return bundledTriageSteps;
  }
}

export function useTriage() {
  const { value: steps, isLoading } = useCachedValue(
    TRIAGE_STEPS_CACHE_KEY,
    readTriageSteps,
    NO_STEPS,
  );

  return { steps, isLoading };
}
