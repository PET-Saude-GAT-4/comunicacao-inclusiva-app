import AsyncStorage from "@react-native-async-storage/async-storage";

import { specialitiesCacheKey } from "@/constants/cache";
import { useCachedValue } from "@/hooks/useCachedValue";
import { specialityMock } from "@/mocks/specialityMock";
import { Speciality } from "@/types/speciality.types";

const NO_SPECIALITIES: Speciality[] = [];

async function readSpecialities(professionCode: string): Promise<Speciality[]> {
  const fromMock = () =>
    specialityMock.filter((item) => item.professionCode === professionCode);

  try {
    // 1. Try to read from cache (where SyncEngine saves data)
    const cacheData = await AsyncStorage.getItem(
      specialitiesCacheKey(professionCode),
    );

    // 2. If cache is completely empty, fall back to Mock
    return cacheData ? JSON.parse(cacheData) : fromMock();
  } catch {
    console.log("Failed to load specialities from cache. Using Mock.");
    return fromMock();
  }
}

export function useSpecialities(professionCode?: string) {
  const { value: specialities, isLoading } = useCachedValue(
    professionCode,
    readSpecialities,
    NO_SPECIALITIES,
  );

  return { specialities, isLoading };
}
