import { specialityMock } from "@/mocks/specialityMock";
import { Speciality } from "@/types/speciality.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CACHE_KEY = "@specialities_cache";

export function useSpecialities() {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSpecialities = async () => {
    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(CACHE_KEY);

      if (cacheData) {
        setSpecialities(JSON.parse(cacheData));
      } else {
        // 2. If cache is completely empty, fall back to Mock
        setSpecialities(specialityMock);
      }
    } catch (error) {
      console.log("Failed to load specialities from cache. Using Mock.");
      setSpecialities(specialityMock);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSpecialities();
  }, []);

  return { specialities, isLoading, refetch: loadSpecialities };
}
