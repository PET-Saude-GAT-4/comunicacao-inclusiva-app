import { nextBoardsCacheKey } from "@/constants/cache";
import { nextBoardsMock } from "@/mocks/boardMock";
import { Board } from "@/types/board.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useNextBoards(uuid: string) {
  const [nextBoards, setNextBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const cacheKey = nextBoardsCacheKey(uuid);

  const loadNextBoards = async () => {
    if (!uuid) return;

    setIsLoading(true);
    setIsError(false);

    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(cacheKey);

      if (cacheData) {
        // The cache preserves the ranking order returned by the API.
        setNextBoards(JSON.parse(cacheData));
      } else {
        // 2. If not in cache, fall back to Mock
        setNextBoards(nextBoardsMock[uuid] || []);
      }
    } catch (error) {
      console.log(`Failed to load next boards for UUID: ${uuid}. Using Mock.`);
      setNextBoards(nextBoardsMock[uuid] || []);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNextBoards();
  }, [uuid]);

  return { nextBoards, isLoading, isError, refetch: loadNextBoards };
}
