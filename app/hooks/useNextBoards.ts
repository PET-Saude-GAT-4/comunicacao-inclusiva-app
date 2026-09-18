import { nextBoardsCacheKey } from "@/constants/cache";
import { nextBoardsMock } from "@/mocks/boardMock";
import { Board } from "@/types/board.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useNextBoards(uuid: string) {
  const [loaded, setLoaded] = useState<{ uuid: string; boards: Board[] }>({
    uuid: "",
    boards: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadNextBoards = async () => {
    if (!uuid) return;

    setIsLoading(true);
    setIsError(false);

    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(nextBoardsCacheKey(uuid));

      if (cacheData) {
        // An empty list is the API saying this board has no successors, which
        // is not the same as never having synced. The cache keeps the API's
        // ranking order, so nothing here sorts.
        setLoaded({ uuid, boards: JSON.parse(cacheData) });
      } else {
        // 2. If not in cache, fall back to Mock
        setLoaded({ uuid, boards: nextBoardsMock[uuid] || [] });
      }
    } catch (error) {
      console.log(`Failed to load next boards for UUID: ${uuid}.`);
      setLoaded({ uuid, boards: [] });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNextBoards();
  }, [uuid]);

  // Until the load for this uuid lands, the pair still holds the previous
  // board's chain. Reading it as empty keeps that off screen entirely.
  const nextBoards = loaded.uuid === uuid ? loaded.boards : [];

  return { nextBoards, isLoading, isError, refetch: loadNextBoards };
}
