import { EMERGENCY_BOARDS_CACHE_KEY } from "@/constants/cache";
import { bundledEmergencyBoards } from "@/content/emergency";
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
        const parsed: Board[] = JSON.parse(cacheData);
        // Only emergency-typed boards belong in the emergency modules.
        const emergencyBoards = parsed.filter(
          (board) => board.type === "emergency",
        );
        if (emergencyBoards.length > 0) {
          setBoards(emergencyBoards);
        } else {
          setBoards(bundledEmergencyBoards);
        }
      } else {
        // 2. If cache is completely empty, fall back to the bundled content
        setBoards(bundledEmergencyBoards);
      }
    } catch (error) {
      console.log("Failed to load boards from cache. Using bundled content.");
      setBoards(bundledEmergencyBoards);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBoards();
  }, []);

  return { boards, isLoading, refetch: loadBoards };
}
