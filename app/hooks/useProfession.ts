import { PROFESSIONS_CACHE_KEY } from "@/constants/cache";
import { professionMock } from "@/mocks/professionMock";
import { ApiProfession, Profession } from "@/types/profession.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export function useProfessions() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfessions = async () => {
    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(PROFESSIONS_CACHE_KEY);

      if (cacheData) {
        const parsed = JSON.parse(cacheData);
        if (parsed.length > 0) {
          setProfessions(parsed);
        } else {
          setProfessions(professionMock);
        }
      } else {
        // 2. If cache is completely empty, fall back to Mock
        setProfessions(professionMock);
      }
    } catch (error) {
      console.log("Failed to load professions from cache. Using Mock.");
      setProfessions(professionMock);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfessions();
  }, []);

  return { professions, isLoading, refetch: loadProfessions };
}
