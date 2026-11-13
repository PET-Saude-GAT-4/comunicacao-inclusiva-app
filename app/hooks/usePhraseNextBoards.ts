import AsyncStorage from "@react-native-async-storage/async-storage";

import { phraseNextBoardsCacheKey } from "@/constants/cache";
import { useCachedValue } from "@/hooks/useCachedValue";
import { phraseNextBoardsMock } from "@/mocks/boardMock";
import { Board } from "@/types/board.types";

type NextBoards = { boards: Board[]; isError: boolean };

const NO_NEXT_BOARDS: NextBoards = { boards: [], isError: false };

async function readPhraseNextBoards(uuid: string): Promise<NextBoards> {
  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(
      phraseNextBoardsCacheKey(uuid),
    );

    if (cacheData) {
      // An empty list is the API saying this phrase recommends nothing, which
      // is not the same as never having synced. The cache keeps the API's
      // ranking order, so nothing here sorts.
      return { boards: JSON.parse(cacheData), isError: false };
    }

    // 2. If not in cache, fall back to Mock
    return { boards: phraseNextBoardsMock[uuid] || [], isError: false };
  } catch {
    console.log(`Failed to load next boards for phrase: ${uuid}.`);
    return { boards: [], isError: true };
  }
}

export function usePhraseNextBoards(uuid: string) {
  const { value, isReady, isLoading } = useCachedValue(
    uuid,
    readPhraseNextBoards,
    NO_NEXT_BOARDS,
  );

  // An empty `nextBoards` means "recommends nothing" only once isReady; before
  // that it just means the read has not landed.
  return {
    nextBoards: value.boards,
    isReady,
    isLoading,
    isError: value.isError,
  };
}
