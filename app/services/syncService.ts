import { BoardService } from "@/services/boards";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfessionService } from "./ProfessionService";

const boardService = new BoardService();
const professionService = new ProfessionService();

export class SyncService {
  /**
   * Downloads all Professions, specialities, boards and their respective pictograms from the API
   * and saves them to AsyncStorage. Does not block the UI and fails silently
   * if there is no internet connection. Returns true if successful, false if there is an error.
   */
  async syncAll(): Promise<boolean> {
    try {
      console.log("Starting background synchronization...");

      // 1. Sync professions and Specilities
      await this.syncProfessions();

      // 2. Sync Boards and Pictograms
      await this.syncBoards();

      console.log("Sync completed successfully!");
      return true;
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log(
        "Sync failed (API offline or server error). Using current cache.",
      );
      return false;
    }
  }

  private async syncProfessions() {
    try {
      //1. Download All Professions
      const professions = await professionService.getProfessions();

      if (!professions || professions.length === 0) {
        console.log("No professions found in the API.");
        return;
      }

      // Save professions to cache
      await AsyncStorage.setItem(
        "@professions_cache",
        JSON.stringify(professions),
      );
      console.log("Synchronized professions saved in the cache.");

      //2. For each Professions, download its specilities
      for (const profession of professions) {
        try {
          const professionCode = profession.code;
          const specialities =
            await professionService.getSpecilities(professionCode);

          if (specialities && specialities.length > 0) {
            const cacheKey = `@specialities_cache_${professionCode}`;
            await AsyncStorage.setItem(cacheKey, JSON.stringify(specialities));
          }
        } catch (specError) {
          // Catches isolated error from a specific profession to avoid stopping the entire loop
          console.log(
            `Failed to sync specialities of Profession: ${profession.id}`,
          );
        }
      }
    } catch (error) {
      console.log("Error syncing professions:", error);
      throw error;
    }
  }

  private async syncBoards() {
    try {
      // 1. Download all boards
      const boards = await boardService.getBoards();

      if (!boards || boards.length === 0) {
        console.log("No boards found in the API.");
        return;
      }

      // Save boards to cache
      await AsyncStorage.setItem("@boards_cache", JSON.stringify(boards));
      console.log("Synchronized boards saved in the cache.");

      // 2. For each board, download its pictograms
      for (const board of boards) {
        try {
          const pictograms = await boardService.getBoardPictograms(board.uuid);

          if (pictograms && pictograms.length > 0) {
            const cacheKey = `@pictograms_cache${board.uuid}`;
            await AsyncStorage.setItem(cacheKey, JSON.stringify(pictograms));
            console.log(`Pictograms synced for board: ${board.title}`);
          }
        } catch (picError) {
          // Catches isolated error from a specific board to avoid stopping the entire loop
          console.log(`Failed to sync pictograms for board: ${board.uuid}`);
        }
      }
    } catch (error) {
      console.log("Error syncing boards:", error);
      throw error;
    }
  }
}

export const syncService = new SyncService();
