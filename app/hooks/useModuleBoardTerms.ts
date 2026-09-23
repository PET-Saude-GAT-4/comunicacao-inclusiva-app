import { boardTermsCacheKey } from "@/constants/cache";
import { moduleBoardTermsMock } from "@/mocks/modulesMock";
import { Term } from "@/types/term.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useModuleBoardTerms(uuid: string) {
  const [terms, setTerms] = useState<Term[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const CACHE_KEY = boardTermsCacheKey(uuid);

  const loadTerms = async () => {
    if (!uuid) return;

    setIsLoading(true);

    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        const parsed = JSON.parse(cacheData);
        if (parsed.length > 0) {
          setTerms(parsed);
        } else {
          setTerms(moduleBoardTermsMock[uuid] || []);
        }
      } else {
        // 2. If not in cache, fall back to emergency Mock
        setTerms(moduleBoardTermsMock[uuid] || []);
      }
    } catch (error) {
      console.log(`Failed to load cache for UUID: ${uuid}. Using Mock.`);
      setTerms(moduleBoardTermsMock[uuid] || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTerms();
  }, [uuid]);

  return {
    terms,
    isLoading,
    refetch: loadTerms,
  };
}
