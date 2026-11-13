import AsyncStorage from "@react-native-async-storage/async-storage";

import { nextBoardsCacheKey } from "@/constants/cache";
import { useCachedValue } from "@/hooks/useCachedValue";
import { nextBoardsMock } from "@/mocks/boardMock";
import { Board } from "@/types/board.types";

type NextBoards = { boards: Board[]; isError: boolean };

const NO_NEXT_BOARDS: NextBoards = { boards: [], isError: false };

async function readNextBoards(uuid: string): Promise<NextBoards> {
  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(nextBoardsCacheKey(uuid));

    if (cacheData) {
      // An empty list is the API saying this board has no successors, which
      // is not the same as never having synced. The cache keeps the API's
      // ranking order, so nothing here sorts.
      return { boards: JSON.parse(cacheData), isError: false };
    }

    // 2. If not in cache, fall back to Mock
    return { boards: nextBoardsMock[uuid] || [], isError: false };
  } catch {
    console.log(`Failed to load next boards for UUID: ${uuid}.`);
    return { boards: [], isError: true };
  }
}

export function useNextBoards(uuid: string) {
  // Until the load for this uuid lands, the hook returns no chain at all, so
  // the previous board's chain never shows up on screen.
  const { value, isLoading } = useCachedValue(
    uuid,
    readNextBoards,
    NO_NEXT_BOARDS,
  );

  return { nextBoards: value.boards, isLoading, isError: value.isError };
}
