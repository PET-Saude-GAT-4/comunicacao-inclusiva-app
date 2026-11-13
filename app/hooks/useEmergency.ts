import AsyncStorage from "@react-native-async-storage/async-storage";

import { EMERGENCY_BOARDS_CACHE_KEY } from "@/constants/cache";
import { bundledEmergencyBoards } from "@/content/emergency";
import { useCachedValue } from "@/hooks/useCachedValue";
import { Board } from "@/types/board.types";

const NO_BOARDS: Board[] = [];

async function readEmergencyBoards(cacheKey: string): Promise<Board[]> {
  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(cacheKey);

    if (cacheData) {
      const parsed: Board[] = JSON.parse(cacheData);
      // Only emergency-typed boards belong in the emergency modules.
      const emergencyBoards = parsed.filter(
        (board) => board.type === "emergency",
      );
      return emergencyBoards.length > 0
        ? emergencyBoards
        : bundledEmergencyBoards;
    }

    // 2. If cache is completely empty, fall back to the bundled content
    return bundledEmergencyBoards;
  } catch {
    console.log("Failed to load boards from cache. Using bundled content.");
    return bundledEmergencyBoards;
  }
}

export function useEmergency() {
  const { value: boards, isLoading } = useCachedValue(
    EMERGENCY_BOARDS_CACHE_KEY,
    readEmergencyBoards,
    NO_BOARDS,
  );

  return { boards, isLoading };
}
