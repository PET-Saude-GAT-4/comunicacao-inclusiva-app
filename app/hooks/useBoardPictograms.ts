import { pictogramsMock } from "@/mocks/boardMock";
import { BoardService } from "@/services/boards";
import { Pictogram } from "@/types/pictogram.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const boardService = new BoardService();

export function useBoardPictogram(uuid: string) {
  const [pictograms, setPictograms] = useState<Pictogram[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const CACHE_KEY = `@pictograms_cache${uuid}`;

  const fetchPictograms = async () => {
    if (!uuid) return;

    setIsLoading(true);
    setIsError(false);

    let hasCache = false;

    try {
      //Try do get cache first
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        setPictograms(JSON.parse(cacheData));

        setIsLoading(false);
        hasCache = true;
      }

      const newData = await boardService.getBoardPictograms(uuid);

      //Update data from API
      if (newData && newData.length > 0) {
        setPictograms(newData);

        AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
      } else if (!hasCache) {
        //If there is no data from the api and cache, use the mock
        setPictograms(pictogramsMock[uuid] || []);
      }
    } catch (error) {
      console.log(`Erro na API. UUID: ${uuid}`, error);
      setIsError(true);

      //if there is an api error and and there is no data in the cache
      if (!hasCache) {
        setPictograms(pictogramsMock[uuid] || []);
      }
    } finally {
      //Remove skeleton
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPictograms();
  }, [uuid]);

  return { pictograms, isLoading, isError, refetch: fetchPictograms };
}
