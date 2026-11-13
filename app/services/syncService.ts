import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  BOARD_TERMS_KEY_PREFIX,
  BOARDS_CACHE_KEY,
  boardTermsCacheKey,
  EMERGENCY_BOARDS_CACHE_KEY,
  NEXT_BOARDS_KEY_PREFIX,
  nextBoardsCacheKey,
  PHRASE_NEXT_BOARDS_KEY_PREFIX,
  phraseNextBoardsCacheKey,
  PHRASES_CACHE_KEY,
  PROFESSIONS_CACHE_KEY,
  SPECIALITIES_KEY_PREFIX,
  specialitiesCacheKey,
  TRIAGE_STEPS_CACHE_KEY,
} from "@/constants/cache";
import { BoardService } from "@/services/boards";
import { PhraseService } from "@/services/phrases";
import { TriageService } from "@/services/triage";
import { Board, BoardType } from "@/types/board.types";

import { ProfessionService } from "./ProfessionService";

const boardService = new BoardService();
const phraseService = new PhraseService();
const professionService = new ProfessionService();
const triageService = new TriageService();

// Outcome of each board's terms sync within one syncAll run, keyed by board
// uuid. A triage level's board is also listed among emergency boards, so the
// second list reuses the first one's outcome, failure included, instead of
// requesting the same terms again.
type SyncedBoardTerms = Map<string, Promise<boolean>>;

// `ids` are the entries of the list just downloaded (board or phrase uuids,
// profession codes), still listed even when their own request failed; `null`
// means the list itself failed, so which entries are live is unknown.
type ListOutcome = { ok: boolean; ids: string[] | null };

const FAILED_LIST: ListOutcome = { ok: false, ids: null };

// Every list is cached as the API returned it, the empty list included: "the
// server has none" must replace what an earlier sync saved, and stay
// distinguishable from "never synced", which is when the hooks fall back to
// their mocks.
export class SyncService {
  /**
   * Downloads every resource the app can use offline and saves it to AsyncStorage.
   * Does not block the UI and fails silently if there is no internet connection.
   * Each resource is synced on its own, so a failure in one does not discard the other.
   * Returns true if every request succeeded, false if any failed, including the
   * per-entry ones (a board's terms, a profession's specialities…), whose entry
   * is then served from its previous cache. Then removes the per-entry caches
   * of boards, phrases and professions the API no longer lists.
   */
  async syncAll(): Promise<boolean> {
    console.log("Starting background synchronization...");

    const syncedBoardTerms: SyncedBoardTerms = new Map();
    const professions = await this.syncProfessions();
    const boards = await this.syncBoards(syncedBoardTerms);
    const emergencyBoards = await this.syncEmergencyBoards(syncedBoardTerms);
    const triageSteps = await this.syncTriageSteps(syncedBoardTerms);
    const phrases = await this.syncPhrases();

    const cleanupOk = await this.clearRemovedEntries([
      [SPECIALITIES_KEY_PREFIX, [professions]],
      [PHRASE_NEXT_BOARDS_KEY_PREFIX, [phrases]],
      [NEXT_BOARDS_KEY_PREFIX, [boards, emergencyBoards]],
      // Common boards, emergency boards and triage levels share one terms key
      // per board, so a key stays while any of the three lists has its board.
      [BOARD_TERMS_KEY_PREFIX, [boards, emergencyBoards, triageSteps]],
    ]);

    const allOk =
      [professions, boards, emergencyBoards, triageSteps, phrases].every(
        (list) => list.ok,
      ) && cleanupOk;

    if (allOk) {
      console.log("Sync completed successfully!");
    } else {
      console.log(
        "Sync finished with some errors. Using current cache for failed items.",
      );
    }

    return allOk;
  }

  private async syncProfessions(): Promise<ListOutcome> {
    try {
      //1. Download All Professions
      const professions = await professionService.getProfessions();

      await AsyncStorage.setItem(
        PROFESSIONS_CACHE_KEY,
        JSON.stringify(professions),
      );
      console.log("Synchronized professions saved in the cache.");

      //2. For each Professions, download its specilities
      let allOk = true;
      for (const profession of professions) {
        try {
          const professionCode = profession.code;
          const specialities =
            await professionService.getSpecialities(professionCode);

          const cacheKey = specialitiesCacheKey(professionCode);
          await AsyncStorage.setItem(cacheKey, JSON.stringify(specialities));
        } catch (specError) {
          // Catches isolated error from a specific profession to avoid stopping the entire loop
          console.log(
            `Failed to sync specialities of Profession: ${profession.id}`,
          );
          allOk = false;
        }
      }

      return {
        ok: allOk,
        ids: professions.map((profession) => profession.code),
      };
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log(
        "Professions sync failed (API offline or server error). Using current cache.",
      );
      return FAILED_LIST;
    }
  }

  private async syncBoards(synced: SyncedBoardTerms): Promise<ListOutcome> {
    return this.syncBoardList("common", BOARDS_CACHE_KEY, synced);
  }

  // The API only lists emergency boards when asked for them by type, so they
  // are pulled and cached apart from the common ones.
  private async syncEmergencyBoards(
    synced: SyncedBoardTerms,
  ): Promise<ListOutcome> {
    return this.syncBoardList("emergency", EMERGENCY_BOARDS_CACHE_KEY, synced);
  }

  // Quick Emergency levels come from their own endpoint, in level order, each
  // with its board; only the boards' terms need a request of their own.
  private async syncTriageSteps(
    synced: SyncedBoardTerms,
  ): Promise<ListOutcome> {
    try {
      const steps = await triageService.getTriageSteps();

      // With no level filled, the app falls back to its bundled levels.
      await AsyncStorage.setItem(TRIAGE_STEPS_CACHE_KEY, JSON.stringify(steps));
      console.log("Synchronized triage steps saved in the cache.");

      let allOk = true;
      for (const step of steps) {
        if (!(await this.syncBoardTerms(step.board, synced))) allOk = false;
      }

      return { ok: allOk, ids: steps.map((step) => step.board.uuid) };
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log(
        "Triage steps sync failed (API offline or server error). Using current cache.",
      );
      return FAILED_LIST;
    }
  }

  // Failures stay isolated to one board, so the rest of a list still syncs.
  private syncBoardTerms(
    board: Board,
    synced: SyncedBoardTerms,
  ): Promise<boolean> {
    let outcome = synced.get(board.uuid);
    if (!outcome) {
      outcome = this.requestBoardTerms(board);
      synced.set(board.uuid, outcome);
    }
    return outcome;
  }

  private async requestBoardTerms(board: Board): Promise<boolean> {
    try {
      const boardTerms = await boardService.getBoardTerms(board.uuid);

      const cacheKey = boardTermsCacheKey(board.uuid);
      await AsyncStorage.setItem(cacheKey, JSON.stringify(boardTerms));
      console.log(`BoardTerms synced for board: ${board.title}`);
      return true;
    } catch (picError) {
      console.log(`Failed to sync BoardTerms for board: ${board.uuid}`);
      return false;
    }
  }

  private async syncBoardList(
    type: BoardType,
    cacheKey: string,
    synced: SyncedBoardTerms,
  ): Promise<ListOutcome> {
    try {
      // 1. Download all boards of this type
      const boards = await boardService.getBoards(type);

      await AsyncStorage.setItem(cacheKey, JSON.stringify(boards));
      console.log(`Synchronized ${type} boards saved in the cache.`);

      // 2. For each board, download its terms and its next boards
      let allOk = true;
      for (const board of boards) {
        if (!(await this.syncBoardTerms(board, synced))) allOk = false;

        try {
          const nextBoards = await boardService.getNextBoards(board.uuid);
          const cacheKey = nextBoardsCacheKey(board.uuid);
          await AsyncStorage.setItem(cacheKey, JSON.stringify(nextBoards));
          console.log(`Next boards synced for board: ${board.title}`);
        } catch (chainError) {
          console.log(`Failed to sync next boards for board: ${board.uuid}`);
          allOk = false;
        }
      }

      return { ok: allOk, ids: boards.map((board) => board.uuid) };
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log(
        `${type} boards sync failed (API offline or server error). Using current cache.`,
      );
      return FAILED_LIST;
    }
  }

  private async syncPhrases(): Promise<ListOutcome> {
    try {
      // Phrases already carry their pictograms, so a single request is enough
      const phrases = await phraseService.getPhrases();

      await AsyncStorage.setItem(PHRASES_CACHE_KEY, JSON.stringify(phrases));
      console.log("Synchronized phrases saved in the cache.");

      // One request per phrase, the same shape syncBoards uses for chains. It
      // grows with the number of phrases, which is what the offline guarantee
      // costs.
      let allOk = true;
      for (const phrase of phrases) {
        try {
          const nextBoards = await phraseService.getPhraseNextBoards(
            phrase.uuid,
          );
          const cacheKey = phraseNextBoardsCacheKey(phrase.uuid);
          await AsyncStorage.setItem(cacheKey, JSON.stringify(nextBoards));
          console.log(`Next boards synced for phrase: ${phrase.description}`);
        } catch (chainError) {
          console.log(`Failed to sync next boards for phrase: ${phrase.uuid}`);
          allOk = false;
        }
      }

      return { ok: allOk, ids: phrases.map((phrase) => phrase.uuid) };
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log(
        "Phrases sync failed (API offline or server error). Using current cache.",
      );
      return FAILED_LIST;
    }
  }

  // A family of per-entry keys is cleaned only when every list it depends on
  // downloaded: with a failed list the live entries are unknown, and deleting
  // would drop data the app still needs offline.
  private async clearRemovedEntries(
    families: [prefix: string, lists: ListOutcome[]][],
  ): Promise<boolean> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const removed: string[] = [];

      for (const [prefix, lists] of families) {
        const listed = lists.map((list) => list.ids);
        if (!listed.every((ids): ids is string[] => ids !== null)) continue;
        const live = new Set(listed.flat());
        for (const key of keys) {
          if (key.startsWith(prefix) && !live.has(key.slice(prefix.length))) {
            removed.push(key);
          }
        }
      }

      if (removed.length > 0) await AsyncStorage.multiRemove(removed);
      return true;
    } catch (error) {
      // Silent failure. We don't pass 'error' to avoid freezing the React Native console.
      console.log("Failed to clear the caches of removed entries.");
      return false;
    }
  }
}

export const syncService = new SyncService();
