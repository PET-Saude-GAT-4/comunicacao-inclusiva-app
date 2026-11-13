import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { phraseNextBoardsCacheKey } from "@/constants/cache";
import { usePhraseNextBoards } from "@/hooks/usePhraseNextBoards";
import { phraseNextBoardsMock } from "@/mocks/boardMock";

beforeEach(() => AsyncStorage.clear());

describe("usePhraseNextBoards", () => {
  it("falls back to the mocks when the phrase's boards were never synced", async () => {
    const { result } = await renderHook(() => usePhraseNextBoards("phrase-1"));

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.nextBoards).toEqual(phraseNextBoardsMock["phrase-1"]);
  });

  it("is ready with no boards when the API recommends nothing", async () => {
    await AsyncStorage.setItem(phraseNextBoardsCacheKey("phrase-1"), "[]");

    const { result } = await renderHook(() => usePhraseNextBoards("phrase-1"));

    await waitFor(() => expect(result.current.isReady).toBe(true));
    expect(result.current.nextBoards).toEqual([]);
  });

  it("is ready at once without a phrase", async () => {
    const { result } = await renderHook(() => usePhraseNextBoards(""));

    expect(result.current.isReady).toBe(true);
    expect(result.current.nextBoards).toEqual([]);
  });
});
