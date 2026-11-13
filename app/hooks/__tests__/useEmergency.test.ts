import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { EMERGENCY_BOARDS_CACHE_KEY } from "@/constants/cache";
import { bundledEmergencyBoards } from "@/content/emergency";
import { useEmergency } from "@/hooks/useEmergency";

beforeEach(() => AsyncStorage.clear());

describe("useEmergency", () => {
  it("keeps the bundled modules when the API sent no emergency boards", async () => {
    await AsyncStorage.setItem(EMERGENCY_BOARDS_CACHE_KEY, "[]");

    const { result } = await renderHook(() => useEmergency());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.boards).toEqual(bundledEmergencyBoards);
  });
});
