import AsyncStorage from "@react-native-async-storage/async-storage";
import { renderHook, waitFor } from "@testing-library/react-native";

import { boardTermsCacheKey } from "@/constants/cache";
import { bundledEmergencyBoardTerms } from "@/content/emergency";
import { useModuleBoardTerms } from "@/hooks/useModuleBoardTerms";

const bundledBoard = Object.keys(bundledEmergencyBoardTerms)[0];

beforeEach(() => AsyncStorage.clear());

describe("useModuleBoardTerms", () => {
  it("keeps the bundled terms when the API sent none for the module", async () => {
    await AsyncStorage.setItem(boardTermsCacheKey(bundledBoard), "[]");

    const { result } = await renderHook(() =>
      useModuleBoardTerms(bundledBoard),
    );

    await waitFor(() =>
      expect(result.current.terms).toEqual(
        bundledEmergencyBoardTerms[bundledBoard],
      ),
    );
  });
});
