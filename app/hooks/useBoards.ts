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

    try {
      //Tryng to get data from the cache first using AsyncStorage
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        setBoards(JSON.parse(cacheData));
        setIsLoading(false);
      } else {
        //Using existing mocks because there is no cache
        setBoards(boardsMock);
        setIsLoading(false);
      }

      //Trying to get API data with fetch
      const newData = await boardService.getBoards();

      if (newData && newData.length === 0) {
        return;
      }

      //Update API data to the cache
      setBoards(newData);
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.log("Erro na API, usando fallback", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return { boards, isLoading, isError, refetch: fetchBoards };
}
