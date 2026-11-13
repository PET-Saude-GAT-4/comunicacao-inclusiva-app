import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { BOARDS_CACHE_KEY } from "@/constants/cache";
import { useBoards } from "@/hooks/useBoards";
import { boardsMock } from "@/mocks/boardMock";

beforeEach(() => AsyncStorage.clear());

describe("useBoards", () => {
  it("falls back to the mocks when the boards were never synced", async () => {
    const { result } = await renderHook(() => useBoards());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.boards).toEqual(boardsMock);
  });

  it("returns an empty list when the API sent no boards", async () => {
    await AsyncStorage.setItem(BOARDS_CACHE_KEY, "[]");

    const { result } = await renderHook(() => useBoards());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.boards).toEqual([]);
  });
});
