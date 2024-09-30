import { API_URL, TOKEN } from '../../shared/constants/constants.ts';
import { MovieType } from '../../shared/types/MoviesTypes.ts';
import { createEffect, createStore } from 'effector';

export const MovieDataFetcher = createEffect(async (id: string) => {
  console.log(TOKEN);
  const url = `${API_URL}movie/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-KEY': TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
});

export const movieDataStore = createStore<MovieType | null>(null)
  .on(MovieDataFetcher.done, (_, payload) => payload.result)
  .reset(MovieDataFetcher.fail);
