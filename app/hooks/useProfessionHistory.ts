import { Profession } from "@/types/Profession.types";
import { Speciality } from "@/types/speciality.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type HistoryEntry = {
  profession: Profession;
  speciality: Speciality;
};

const HISTORIC_KEY = "@profession_history";
const MAX_HISTORY = 5;

export function useProfessionHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(HISTORIC_KEY).then((data) => {
      if (data) {
        setHistory(JSON.parse(data));
      }
    });
  }, []);

  const addHistoryEntry = async (
    profession: Profession,
    speciality: Speciality,
  ) => {
    const newEntry = { profession, speciality };

    const removeDuplicate = history.filter(
      (item) =>
        !(
          item.profession.id === profession.id &&
          item.speciality.id === speciality.id
        ),
    );

    const newHistory = [newEntry, ...removeDuplicate].slice(0, MAX_HISTORY);
    setHistory(newHistory);

    await AsyncStorage.setItem(HISTORIC_KEY, JSON.stringify(newHistory));
  };

  return { history, addHistoryEntry };
}
