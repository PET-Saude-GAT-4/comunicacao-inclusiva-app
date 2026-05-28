import { BoardService } from "@/services/boards";
import AsyncStorage from "@react-native-async-storage/async-storage";

const boardService = new BoardService();

export class SyncService {
  /**
* Downloads all boards and their respective pictograms from the API
* and saves them to AsyncStorage. Does not block the UI and fails silently
* if there is no internet connection. Returns true if successful, false if there is an error.
*/
  async syncAll(): Promise<boolean> {
    try {
      console.log("Starting background synchronization...");

      // 1. Download all boards
      const boards = await boardService.getBoards();

      if (!boards || boards.length === 0) {
        console.log("No boards found in the API.");
        return true;
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

      console.log("Sync completed successfully!");
      return true;
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log("Sync failed (API offline or server error). Using current cache.");
      return false;
    }
  }
}

export const syncService = new SyncService();
