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

// One key per entry of a list. The sync finds the keys of entries the API no
// longer lists by these prefixes, so each one must not be the start of another.
export const SPECIALITIES_KEY_PREFIX = "@specialities_cache_";
export const BOARD_TERMS_KEY_PREFIX = "@board_terms:";
export const NEXT_BOARDS_KEY_PREFIX = "@next_boards_cache:";
export const PHRASE_NEXT_BOARDS_KEY_PREFIX = "@phrase_next_boards_cache:";

export const specialitiesCacheKey = (professionCode: string) =>
  `${SPECIALITIES_KEY_PREFIX}${professionCode}`;

export const boardTermsCacheKey = (uuid: string) =>
  `${BOARD_TERMS_KEY_PREFIX}${uuid}`;

export const nextBoardsCacheKey = (uuid: string) =>
  `${NEXT_BOARDS_KEY_PREFIX}${uuid}`;

export const phraseNextBoardsCacheKey = (uuid: string) =>
  `${PHRASE_NEXT_BOARDS_KEY_PREFIX}${uuid}`;
