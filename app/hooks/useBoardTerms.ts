import AsyncStorage from "@react-native-async-storage/async-storage";

import { boardTermsCacheKey } from "@/constants/cache";
import { useCachedValue } from "@/hooks/useCachedValue";
import { boardTermsMock } from "@/mocks/boardMock";
import { Term } from "@/types/term.types";

const NO_TERMS: Term[] = [];

async function readBoardTerms(uuid: string): Promise<Term[]> {
  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(boardTermsCacheKey(uuid));

    // 2. If not in cache, fall back to emergency Mock
    return cacheData ? JSON.parse(cacheData) : boardTermsMock[uuid] || [];
  } catch {
    console.log(`Failed to load cache for UUID: ${uuid}. Using Mock.`);
    return boardTermsMock[uuid] || [];
  }
}

export function useBoardTerms(uuid: string) {
  const { value: terms, isLoading } = useCachedValue(
    uuid,
    readBoardTerms,
    NO_TERMS,
  );

  return { terms, isLoading };
}
