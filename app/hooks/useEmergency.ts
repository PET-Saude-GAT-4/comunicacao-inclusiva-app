import { boardsMock } from "@/mocks/modulesMock";
import { Board } from "@/types/board.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CACHE_KEY = "@boards_cache";

export function useEmergency() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBoards = async () => {
    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        setBoards(JSON.parse(cacheData));
      } else {
        // 2. If cache is completely empty, fall back to Mock
        setBoards(boardsMock);
      }
    } catch (error) {
      console.log("Failed to load boards from cache. Using Mock.");
      setBoards(boardsMock);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return { boards, isLoading, refetch: loadBoards };
}
