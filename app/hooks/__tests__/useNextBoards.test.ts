import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { nextBoardsCacheKey } from "@/constants/cache";
import { useNextBoards } from "@/hooks/useNextBoards";
import { nextBoardsMock } from "@/mocks/boardMock";
import { Board } from "@/types/board.types";

const mockedBoard = Object.keys(nextBoardsMock)[0];
const cached = [{ uuid: "board-9", title: "Cacheado" } as Board];

beforeEach(() => AsyncStorage.clear());

describe("useNextBoards", () => {
  it("falls back to the mocks when the board's chain was never synced", async () => {
    const { result } = await renderHook(() => useNextBoards(mockedBoard));

    await waitFor(() =>
      expect(result.current.nextBoards).toEqual(nextBoardsMock[mockedBoard]),
    );
    expect(result.current.isError).toBe(false);
  });

  it("returns the cached chain in the order it was stored", async () => {
    await AsyncStorage.setItem(
      nextBoardsCacheKey(mockedBoard),
      JSON.stringify(cached),
    );

    const { result } = await renderHook(() => useNextBoards(mockedBoard));

    await waitFor(() => expect(result.current.nextBoards).toEqual(cached));
  });

  it("returns nothing and reads nothing without a board", async () => {
    const { result } = await renderHook(() => useNextBoards(""));

    expect(result.current.nextBoards).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
