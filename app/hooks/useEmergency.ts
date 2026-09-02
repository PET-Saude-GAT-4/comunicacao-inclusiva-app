import { EMERGENCY_BOARDS_CACHE_KEY } from "@/constants/cache";
import { emergencyBoardsMock } from "@/mocks/modulesMock";
import { Board } from "@/types/board.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useEmergency() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBoards = async () => {
    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(EMERGENCY_BOARDS_CACHE_KEY);

      if (cacheData) {
        const parsed = JSON.parse(cacheData);
        if (parsed.length > 0) {
          setBoards(parsed);
        } else {
          setBoards(emergencyBoardsMock);
        }
      } else {
        // 2. If cache is completely empty, fall back to Mock
        setBoards(emergencyBoardsMock);
      }
    } catch (error) {
      console.log("Failed to load boards from cache. Using Mock.");
      setBoards(emergencyBoardsMock);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return { boards, isLoading, refetch: loadBoards };
}
