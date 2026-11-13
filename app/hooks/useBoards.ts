import AsyncStorage from "@react-native-async-storage/async-storage";

import { BOARDS_CACHE_KEY } from "@/constants/cache";
import { useCachedValue } from "@/hooks/useCachedValue";
import { boardsMock } from "@/mocks/boardMock";
import { Board } from "@/types/board.types";

const NO_BOARDS: Board[] = [];

async function readBoards(cacheKey: string): Promise<Board[]> {
  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(cacheKey);

    // 2. If cache is completely empty, fall back to Mock
    return cacheData ? JSON.parse(cacheData) : boardsMock;
  } catch {
    console.log("Failed to load boards from cache. Using Mock.");
    return boardsMock;
  }
}

export function useBoards() {
  const { value: boards, isLoading } = useCachedValue(
    BOARDS_CACHE_KEY,
    readBoards,
    NO_BOARDS,
  );

  return { boards, isLoading };
}
