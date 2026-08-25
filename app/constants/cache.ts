export const BOARDS_CACHE_KEY = "@boards_cachekey";

export const PHRASES_CACHE_KEY = "@phrases_cachekey";

export const PROFESSIONS_CACHE_KEY = "@professions_cache";

export const PROFESSIONS_HISTORIC_KEY = "@profession_history";

export const specialitiesCacheKey = (professionCode: string) =>
  `@specialities_cache_${professionCode}`;

export const boardItemsCacheKey = (uuid: string) => `@board_items:${uuid}`;

export const nextBoardsCacheKey = (uuid: string) =>
  `@next_boards_cache:${uuid}`;
