import { phraseNextBoardsCacheKey } from "@/constants/cache";
import { phraseNextBoardsMock } from "@/mocks/boardMock";
import { Board } from "@/types/board.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function usePhraseNextBoards(uuid: string) {
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
      const cacheData = await AsyncStorage.getItem(
        phraseNextBoardsCacheKey(uuid),
      );

      if (cacheData) {
        // An empty list is the API saying this phrase recommends nothing, which
        // is not the same as never having synced. The cache keeps the API's
        // ranking order, so nothing here sorts.
        setLoaded({ uuid, boards: JSON.parse(cacheData) });
      } else {
        // 2. If not in cache, fall back to Mock
        setLoaded({ uuid, boards: phraseNextBoardsMock[uuid] || [] });
      }
    } catch (error) {
      console.log(`Failed to load next boards for phrase: ${uuid}.`);
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
  // phrase's recommendations. Reading it as empty keeps that off screen.
  const isReady = loaded.uuid === uuid;
  const nextBoards = isReady ? loaded.boards : [];

  // An empty `nextBoards` means "recommends nothing" only once isReady; before
  // that it just means the read has not landed.
  return { nextBoards, isReady, isLoading, isError, refetch: loadNextBoards };
}
