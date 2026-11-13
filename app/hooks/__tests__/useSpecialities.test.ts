import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { specialitiesCacheKey } from "@/constants/cache";
import { useSpecialities } from "@/hooks/useSpecialities";
import { specialityMock } from "@/mocks/specialityMock";

beforeEach(() => AsyncStorage.clear());

describe("useSpecialities", () => {
  it("falls back to the profession's mocks when its specialities were never synced", async () => {
    const { result } = await renderHook(() => useSpecialities("MED"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.specialities).toEqual(
      specialityMock.filter((item) => item.professionCode === "MED"),
    );
  });

  it("returns an empty list when the API sent no specialities", async () => {
    await AsyncStorage.setItem(specialitiesCacheKey("MED"), "[]");

    const { result } = await renderHook(() => useSpecialities("MED"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.specialities).toEqual([]);
  });
});
