import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { boardTermsCacheKey } from "@/constants/cache";
import { useBoardTerms } from "@/hooks/useBoardTerms";
import { boardTermsMock } from "@/mocks/boardMock";

const mockedBoard = Object.keys(boardTermsMock)[0];

beforeEach(() => AsyncStorage.clear());

describe("useBoardTerms", () => {
  it("falls back to the mocks when the board's terms were never synced", async () => {
    const { result } = await renderHook(() => useBoardTerms(mockedBoard));

    await waitFor(() =>
      expect(result.current.terms).toEqual(boardTermsMock[mockedBoard]),
    );
  });

  it("returns an empty list when the API sent no terms for the board", async () => {
    await AsyncStorage.setItem(boardTermsCacheKey(mockedBoard), "[]");

    const { result } = await renderHook(() => useBoardTerms(mockedBoard));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.terms).toEqual([]);
  });
});
