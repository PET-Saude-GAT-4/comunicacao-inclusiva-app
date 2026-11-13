import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { PROFESSIONS_HISTORIC_KEY } from "@/constants/cache";
import { useProfessionHistory } from "@/hooks/useProfessionHistory";
import { Profession } from "@/types/profession.types";
import { Speciality } from "@/types/speciality.types";

const medicine = { code: "MED", name: "Medicina" } as Profession;
// The hook re-reads the history whenever its list changes identity, so each
// test hands it one array that stays the same across renders.
const available = [medicine];
const noProfessions: Profession[] = [];
const entry = {
  profession: medicine,
  speciality: { code: "PED" } as Speciality,
};

beforeEach(async () => {
  await AsyncStorage.clear();
  await AsyncStorage.setItem(PROFESSIONS_HISTORIC_KEY, JSON.stringify([entry]));
});

describe("useProfessionHistory", () => {
  it("keeps the entries whose profession is still available", async () => {
    const { result } = await renderHook(() => useProfessionHistory(available));

    await waitFor(() => expect(result.current.history).toEqual([entry]));
  });

  it("drops every entry when the server publishes no professions", async () => {
    const { result } = await renderHook(() =>
      useProfessionHistory(noProfessions),
    );

    // The history starts empty too, so wait for the stored one to be read.
    await act(() => new Promise((resolve) => setTimeout(resolve, 50)));
    expect(result.current.history).toEqual([]);
  });

  it("shows the stored history unfiltered when given no list to check against", async () => {
    const { result } = await renderHook(() => useProfessionHistory());

    await waitFor(() => expect(result.current.history).toEqual([entry]));
  });
});
