import {
  BOARDS_CACHE_KEY,
  nextBoardsCacheKey,
  PHRASES_CACHE_KEY,
  pictogramsCacheKey,
} from "@/constants/cache";
import { BoardService } from "@/services/boards";
import { PhraseService } from "@/services/phrases";
import AsyncStorage from "@react-native-async-storage/async-storage";

const boardService = new BoardService();
const phraseService = new PhraseService();

export class SyncService {
  /**
   * Downloads every resource the app can use offline and saves it to AsyncStorage.
   * Does not block the UI and fails silently if there is no internet connection.
   * Each resource is synced on its own, so a failure in one does not discard the other.
   * Returns true if everything was synced, false if any step failed.
   */
  async syncAll(): Promise<boolean> {
    console.log("Starting background synchronization...");

    const boardsOk = await this.syncBoards();
    const phrasesOk = await this.syncPhrases();

    if (boardsOk && phrasesOk) {
      console.log("Sync completed successfully!");
    }

    return boardsOk && phrasesOk;
  }

  private async syncBoards(): Promise<boolean> {
    try {
      // 1. Download all boards
      const boards = await boardService.getBoards();

      if (!boards || boards.length === 0) {
        console.log("No boards found in the API.");
        return true;
      }

      // Save boards to cache
      await AsyncStorage.setItem(BOARDS_CACHE_KEY, JSON.stringify(boards));
      console.log("Synchronized boards saved in the cache.");

      // 2. For each board, download its pictograms and its next boards
      for (const board of boards) {
        try {
          const pictograms = await boardService.getBoardPictograms(board.uuid);

          if (pictograms && pictograms.length > 0) {
            const cacheKey = pictogramsCacheKey(board.uuid);
            await AsyncStorage.setItem(cacheKey, JSON.stringify(pictograms));
            console.log(`Pictograms synced for board: ${board.title}`);
          }
        } catch (picError) {
          // Catches isolated error from a specific board to avoid stopping the entire loop
          console.log(`Failed to sync pictograms for board: ${board.uuid}`);
        }

        try {
          const nextBoards = await boardService.getNextBoards(board.uuid);

          // Having no next boards is a valid state, so the empty list is cached
          // as well. Otherwise it would be indistinguishable from a board that
          // has never been synced.
          const cacheKey = nextBoardsCacheKey(board.uuid);
          await AsyncStorage.setItem(cacheKey, JSON.stringify(nextBoards));
          console.log(`Next boards synced for board: ${board.title}`);
        } catch (chainError) {
          console.log(`Failed to sync next boards for board: ${board.uuid}`);
        }
      }

      return true;
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log(
        "Boards sync failed (API offline or server error). Using current cache.",
      );
      return false;
    }
  }

  private async syncPhrases(): Promise<boolean> {
    try {
      // Phrases already carry their pictograms, so a single request is enough
      const phrases = await phraseService.getPhrases();

      if (!phrases || phrases.length === 0) {
        console.log("No phrases found in the API.");
        return true;
      }

      await AsyncStorage.setItem(PHRASES_CACHE_KEY, JSON.stringify(phrases));
      console.log("Synchronized phrases saved in the cache.");

      return true;
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log(
        "Phrases sync failed (API offline or server error). Using current cache.",
      );
      return false;
    }
  }
}

export const syncService = new SyncService();
