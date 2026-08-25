import { boardItemsCacheKey } from "@/constants/cache";
import { boardItemsMock } from "@/mocks/modulesMock";
import { BoardItem } from "@/types/item.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useModuleBoardItems(uuid: string) {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const CACHE_KEY = boardItemsCacheKey(uuid);

  const loadItems = async () => {
    if (!uuid) return;

    setIsLoading(true);

    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        setItems(JSON.parse(cacheData));
      } else {
        // 2. If not in cache, fall back to emergency Mock
        setItems(boardItemsMock[uuid] || []);
      }
    } catch (error) {
      console.log(`Failed to load cache for UUID: ${uuid}. Using Mock.`);
      setItems(boardItemsMock[uuid] || []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [uuid]);

  return { items, isLoading, refetch: loadItems };
}
