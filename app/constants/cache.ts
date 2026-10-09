export const BOARDS_CACHE_KEY = "@boards_cachekey";

// Emergency boards are cached apart from the common ones, since the API only
// lists them when asked for with `?type=emergency`.
export const EMERGENCY_BOARDS_CACHE_KEY = "@emergency_boards_cachekey";

// Quick Emergency levels, each with its board. Their terms are cached under
// boardTermsCacheKey like any other board's.
export const TRIAGE_STEPS_CACHE_KEY = "@triage_steps_cachekey";

export const PHRASES_CACHE_KEY = "@phrases_cachekey";

export const PROFESSIONS_CACHE_KEY = "@professions_cache";

export const PROFESSIONS_HISTORIC_KEY = "@profession_history";

export const specialitiesCacheKey = (professionCode: string) =>
  `@specialities_cache_${professionCode}`;

export const boardTermsCacheKey = (uuid: string) => `@board_terms:${uuid}`;

export const nextBoardsCacheKey = (uuid: string) =>
  `@next_boards_cache:${uuid}`;

export const phraseNextBoardsCacheKey = (uuid: string) =>
  `@phrase_next_boards_cache:${uuid}`;
