export const BOARDS_CACHE_KEY = "@boards_cachekey";

// Emergency modules are cached apart from the public boards. Nothing writes this
// key yet. syncService has no specialty-board endpoint to pull
// so the read always falls through to the mock for now.
export const EMERGENCY_BOARDS_CACHE_KEY = "@boards_cache";

export const PHRASES_CACHE_KEY = "@phrases_cachekey";

export const PROFESSIONS_CACHE_KEY = "@professions_cache";

export const PROFESSIONS_HISTORIC_KEY = "@profession_history";

export const specialitiesCacheKey = (professionCode: string) =>
  `@specialities_cache_${professionCode}`;

export const boardTermsCacheKey = (uuid: string) => `@board_terms:${uuid}`;

export const nextBoardsCacheKey = (uuid: string) =>
  `@next_boards_cache:${uuid}`;
