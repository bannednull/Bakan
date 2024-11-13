import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const searchParams = {
  token: parseAsString.withDefault(''),
};

export const searchParamsCache = createSearchParamsCache(searchParams);
