import { useState, useEffect } from 'react';
import { API_URL, TOKEN } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';

export const useSearch = (debouncedSearchInput: string) => {
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);

  useEffect(() => {
    if (!debouncedSearchInput) return;
    const fetchData = async () => {
      try {
        if (debouncedSearchInput.length > 1) {
          const response = await fetch(`${API_URL}movie/search?page=1&limit=50&query=${debouncedSearchInput}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'X-API-KEY': TOKEN,
            },
          });
          const result = await response.json();
          setSearchResults(result.docs || []);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchData();
  }, [debouncedSearchInput]);

  return searchResults;
};
