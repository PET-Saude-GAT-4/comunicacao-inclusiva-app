import { specialityMock } from "@/mocks/specialityMock";
import { Speciality } from "@/types/speciality.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useSpecialities(professionCode?: string) {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSpecialities = async () => {
    if (!professionCode) {
      setSpecialities([]);
      setIsLoading(false);
      return;
    }
    const cacheKey = `@specialities_cache_${professionCode}`;
    try {
      // 1. Try to read from cache (where SyncEngine saves data)
      const cacheData = await AsyncStorage.getItem(cacheKey);

      if (cacheData) {
        setSpecialities(JSON.parse(cacheData));
      } else {
        // 2. If cache is completely empty, fall back to Mock
        const filteredMock = specialityMock.filter(
          (item) => item.professionCode === professionCode,
        );
        setSpecialities(filteredMock);
      }
    } catch (error) {
      console.log("Failed to load specialities from cache. Using Mock.");
      const filteredMock = specialityMock.filter(
        (item) => item.professionCode === professionCode,
      );
      setSpecialities(filteredMock);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSpecialities();
  }, [professionCode]);

  return { specialities, isLoading, refetch: loadSpecialities };
}
