export const BOARDS_CACHE_KEY = "@boards_cache";

export const PHRASES_CACHE_KEY = "@phrases_cache";

export const PROFESSIONS_CACHE_KEY = "@professions_cache";

export const PROFESSIONS_HISTORIC_KEY = "@profession_history";

export const specialitiesCacheKey= (professionCode: string) => `@specialities_cache_${professionCode}`

export const pictogramsCacheKey = (uuid: string) => `@pictograms_cache${uuid}`;

export const nextBoardsCacheKey = (uuid: string) => `@next_boards_cache${uuid}`;
