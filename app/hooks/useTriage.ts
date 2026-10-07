import { TRIAGE_STEPS_CACHE_KEY } from "@/constants/cache";
import { triageStepsMock } from "@/mocks/modulesMock";
import { TriageStep } from "@/types/triage.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useTriage() {
  const [steps, setSteps] = useState<TriageStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSteps = async () => {
    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(TRIAGE_STEPS_CACHE_KEY);
      const parsed: TriageStep[] = cacheData ? JSON.parse(cacheData) : [];

      if (parsed.length > 0) {
        // The API sends them in level order already; sorting keeps that true
        // whatever wrote the cache.
        setSteps([...parsed].sort((a, b) => a.level - b.level));
      } else {
        // 2. Never synced, or no level filled yet: fall back to the bundled levels
        setSteps(triageStepsMock);
      }
    } catch (error) {
      console.log("Failed to load triage steps from cache. Using Mock.");
      setSteps(triageStepsMock);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSteps();
  }, []);

  return { steps, isLoading, refetch: loadSteps };
}
