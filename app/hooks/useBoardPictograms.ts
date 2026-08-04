import { pictogramsCacheKey } from "@/constants/cache";
import { pictogramsMock } from "@/mocks/boardMock";
import { Pictogram } from "@/types/pictogram.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useBoardPictogram(uuid: string) {
  const [pictograms, setPictograms] = useState<Pictogram[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const CACHE_KEY = pictogramsCacheKey(uuid);

  const loadPictograms = async () => {
    if (!uuid) return;

    setIsLoading(true);

    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        setPictograms(JSON.parse(cacheData));
      } else {
        // 2. If not in cache, fall back to emergency Mock
        setPictograms(pictogramsMock[uuid] || []);
      }
    } catch (error) {
      console.log(`Failed to load cache for UUID: ${uuid}. Using Mock.`);
      setPictograms(pictogramsMock[uuid] || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPictograms();
  }, [uuid]);

  return { pictograms, isLoading, refetch: loadPictograms };
}
