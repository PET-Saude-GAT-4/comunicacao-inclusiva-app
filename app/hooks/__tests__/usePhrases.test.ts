import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { PHRASES_CACHE_KEY } from "@/constants/cache";
import { usePhrases } from "@/hooks/usePhrases";
import { phrasesMock } from "@/mocks/phraseMock";

beforeEach(() => AsyncStorage.clear());

describe("usePhrases", () => {
  it("falls back to the mocks when the phrases were never synced", async () => {
    const { result } = await renderHook(() => usePhrases());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.phrases).toEqual(phrasesMock);
  });

  it("returns an empty list when the API sent no phrases", async () => {
    await AsyncStorage.setItem(PHRASES_CACHE_KEY, "[]");

    const { result } = await renderHook(() => usePhrases());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.phrases).toEqual([]);
  });
});
