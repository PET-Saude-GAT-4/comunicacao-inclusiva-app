import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { TRIAGE_STEPS_CACHE_KEY } from "@/constants/cache";
import { bundledTriageSteps } from "@/content/emergency";
import { useTriage } from "@/hooks/useTriage";

beforeEach(() => AsyncStorage.clear());

describe("useTriage", () => {
  it("keeps the bundled levels when the API sent no triage steps", async () => {
    await AsyncStorage.setItem(TRIAGE_STEPS_CACHE_KEY, "[]");

    const { result } = await renderHook(() => useTriage());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.steps).toEqual(bundledTriageSteps);
  });
});
