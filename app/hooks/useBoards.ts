import { boardsMock } from "@/mocks/boardMock";
import { BoardService } from "@/services/boards";
import { Board } from "@/types/board.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CACHE_KEY = "@boards_cache";

const boardService = new BoardService();

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchBoards = async () => {
    setIsError(false);

    let hasCache = false;
    try {
      //Tryng to get data from the cache first using AsyncStorage
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        setBoards(JSON.parse(cacheData));
        setIsLoading(false);
        hasCache = true;
      }
      //Trying to get API data with fetch
      const newData = await boardService.getBoards();

      if (newData && newData.length > 0) {
        //Update API data to the cache
        setBoards(newData);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
      } else if (!hasCache) {
        //If there is no data from the api and cache, use the mock
        setBoards(boardsMock);
      }
    } catch (error) {
      console.log("Erro na API, usando fallback", error);
      setIsError(true);

      //if there is an api error and and there is no data in the cache
      if (!hasCache) {
        setBoards(boardsMock);
      }

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards, isLoading, isError, refetch: fetchBoards };
}
