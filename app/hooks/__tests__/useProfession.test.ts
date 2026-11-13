import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { PROFESSIONS_CACHE_KEY } from "@/constants/cache";
import { useProfessions } from "@/hooks/useProfession";
import { professionMock } from "@/mocks/professionMock";

beforeEach(() => AsyncStorage.clear());

describe("useProfessions", () => {
  it("falls back to the mocks when the professions were never synced", async () => {
    const { result } = await renderHook(() => useProfessions());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.professions).toEqual(professionMock);
  });

  it("returns an empty list when the API sent no professions", async () => {
    await AsyncStorage.setItem(PROFESSIONS_CACHE_KEY, "[]");

    const { result } = await renderHook(() => useProfessions());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.professions).toEqual([]);
  });
});
