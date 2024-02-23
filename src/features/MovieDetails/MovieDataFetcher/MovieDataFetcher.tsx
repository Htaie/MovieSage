import { useState, useEffect } from 'react';
import { API_URL, TOKEN } from '../../../shared/constants/constants.ts';
import { MovieType } from '../../../shared/types/MoviesTypes.ts';

const MovieDataFetcher = (id: string): MovieType | null => {
  const [data, setData] = useState<MovieType | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
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

        const responseData = await response.json();
        setData(responseData as MovieType | null);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    void fetchData();
  }, [id]);

  return data;
};

export default MovieDataFetcher;
