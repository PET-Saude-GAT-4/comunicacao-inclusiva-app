import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiBoard, apiPhrase, apiTerm } from "@test/fixtures";

import {
  BOARDS_CACHE_KEY,
  boardTermsCacheKey,
  EMERGENCY_BOARDS_CACHE_KEY,
  nextBoardsCacheKey,
  phraseNextBoardsCacheKey,
  PHRASES_CACHE_KEY,
  PROFESSIONS_CACHE_KEY,
  specialitiesCacheKey,
  TRIAGE_STEPS_CACHE_KEY,
} from "@/constants/cache";
import { SyncService } from "@/services/syncService";
import { request } from "@/utils/apiUtils";

// Only the transport is replaced: services and adapters run for real, so the
// cache holds what the app would actually read back.
jest.mock("@/utils/apiUtils", () => ({ request: jest.fn() }));

const API = "http://10.0.0.5:3000/public";
const mockedRequest = jest.mocked(request);

const profession = {
  id: 1,
  name: "Medicina",
  code: "MED",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};
const speciality = {
  ...profession,
  id: 10,
  name: "Pediatria",
  code: "PED",
  professionId: 1,
};
const commonBoard = apiBoard({ uuid: "common-1" });
const emergencyBoard = apiBoard({ uuid: "emergency-1", type: "emergency" });
const triageBoard = apiBoard({ uuid: "triage-board-1", type: "emergency" });
const phraseWire = apiPhrase({ uuid: "phrase-1" });

function defaultRoutes(): Record<string, unknown> {
  return {
    [`${API}/professions`]: { professions: [profession] },
    [`${API}/professions/MED/specialities`]: { specialities: [speciality] },
    [`${API}/boards?type=common`]: { boards: [commonBoard] },
    [`${API}/boards?type=emergency`]: { boards: [emergencyBoard] },
    [`${API}/boards/common-1/terms`]: {
      terms: [apiTerm({ termUuid: "t-common" })],
    },
    [`${API}/boards/emergency-1/terms`]: {
      terms: [apiTerm({ termUuid: "t-emergency" })],
    },
    [`${API}/boards/triage-board-1/terms`]: {
      terms: [apiTerm({ termUuid: "t-triage" })],
    },
    [`${API}/boards/common-1/next-boards`]: { boards: [emergencyBoard] },
    [`${API}/boards/emergency-1/next-boards`]: { boards: [] },
    [`${API}/triage-steps`]: {
      triageSteps: [
        {
          uuid: "step-1",
          level: 1,
          board: triageBoard,
          createdAt: "2026-01-01T00:00:00.000Z",
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
      ],
    },
    [`${API}/phrases`]: { phrases: [phraseWire] },
    [`${API}/phrases/phrase-1/next-boards`]: { boards: [commonBoard] },
  };
}

/** Answers each URL from `routes`; a route set to an Error rejects. */
function serve(routes: Record<string, unknown>) {
  mockedRequest.mockImplementation(async (url: string) => {
    if (!(url in routes)) throw new Error(`Unexpected request: ${url}`);
    const answer = routes[url];
    if (answer instanceof Error) throw answer;
    return answer;
  });
}

async function cached(key: string) {
  const raw = await AsyncStorage.getItem(key);
  return raw === null ? null : JSON.parse(raw);
}

beforeEach(async () => {
  await AsyncStorage.clear();
  mockedRequest.mockReset();
});

describe("SyncService.syncAll", () => {
  it("caches every resource and reports success", async () => {
    serve(defaultRoutes());

    await expect(new SyncService().syncAll()).resolves.toBe(true);

    expect(await cached(PROFESSIONS_CACHE_KEY)).toEqual([profession]);
    expect((await cached(specialitiesCacheKey("MED")))[0].code).toBe("PED");
    expect((await cached(BOARDS_CACHE_KEY))[0].uuid).toBe("common-1");
    expect((await cached(EMERGENCY_BOARDS_CACHE_KEY))[0].uuid).toBe(
      "emergency-1",
    );
    expect((await cached(boardTermsCacheKey("common-1")))[0].uuid).toBe(
      "t-common",
    );
    expect((await cached(boardTermsCacheKey("emergency-1")))[0].uuid).toBe(
      "t-emergency",
    );
    expect((await cached(boardTermsCacheKey("triage-board-1")))[0].uuid).toBe(
      "t-triage",
    );
    expect((await cached(nextBoardsCacheKey("common-1")))[0].uuid).toBe(
      "emergency-1",
    );
    expect((await cached(TRIAGE_STEPS_CACHE_KEY))[0].board.uuid).toBe(
      "triage-board-1",
    );
    expect((await cached(PHRASES_CACHE_KEY))[0].uuid).toBe("phrase-1");
    expect((await cached(phraseNextBoardsCacheKey("phrase-1")))[0].uuid).toBe(
      "common-1",
    );
  });

  it("caches an empty next-boards list instead of skipping it", async () => {
    serve(defaultRoutes());

    await new SyncService().syncAll();

    expect(await cached(nextBoardsCacheKey("emergency-1"))).toEqual([]);
  });

  it("keeps the previous cache for a resource whose request fails", async () => {
    const previous = [{ uuid: "old-phrase" }];
    await AsyncStorage.setItem(PHRASES_CACHE_KEY, JSON.stringify(previous));
    serve({ ...defaultRoutes(), [`${API}/phrases`]: new Error("offline") });

    await expect(new SyncService().syncAll()).resolves.toBe(false);

    expect(await cached(PHRASES_CACHE_KEY)).toEqual(previous);
  });

  it("still syncs the other resources when one fails", async () => {
    serve({ ...defaultRoutes(), [`${API}/professions`]: new Error("500") });

    await expect(new SyncService().syncAll()).resolves.toBe(false);

    expect(await cached(PROFESSIONS_CACHE_KEY)).toBeNull();
    expect((await cached(BOARDS_CACHE_KEY))[0].uuid).toBe("common-1");
    expect((await cached(TRIAGE_STEPS_CACHE_KEY))[0].level).toBe(1);
    expect((await cached(PHRASES_CACHE_KEY))[0].uuid).toBe("phrase-1");
  });

  it("isolates a failure on one board's terms to that board", async () => {
    const previous = [{ uuid: "old-term" }];
    await AsyncStorage.setItem(
      boardTermsCacheKey("common-1"),
      JSON.stringify(previous),
    );
    serve({
      ...defaultRoutes(),
      [`${API}/boards/common-1/terms`]: new Error("timeout"),
    });

    await new SyncService().syncAll();

    expect(await cached(boardTermsCacheKey("common-1"))).toEqual(previous);
    expect((await cached(nextBoardsCacheKey("common-1")))[0].uuid).toBe(
      "emergency-1",
    );
    expect((await cached(boardTermsCacheKey("emergency-1")))[0].uuid).toBe(
      "t-emergency",
    );
  });
});
