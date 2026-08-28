import { boardTermsCacheKey } from "@/constants/cache";
import { boardTermsMock } from "@/mocks/boardMock";
import { Term } from "@/types/term.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

export function useBoardTerms(uuid: string) {
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
        setTerms(JSON.parse(cacheData));
      } else {
        // 2. If not in cache, fall back to emergency Mock
        setTerms(boardTermsMock[uuid] || []);
      }
    } catch (error) {
      console.log(`Failed to load cache for UUID: ${uuid}. Using Mock.`);
      setTerms(boardTermsMock[uuid] || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTerms();
  }, [uuid]);

  const pictograms = useMemo(
    () => terms.map((term) => term.pictogram),
    [terms],
  );

  return {
    terms,
    pictograms, // alias for backwards compatibility during migration
    isLoading,
    refetch: loadTerms,
  };
}

export const useBoardPictogram = useBoardTerms;
