import { useState, useEffect } from 'react';
import { API_URL, SECOND_TOKEN } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';

const useSearch = (searchValue: string) => {
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchValue.length > 1) {
          const response = await fetch(`${API_URL}movie/search?page=1&limit=50&query=${searchValue}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'X-API-KEY': SECOND_TOKEN,
            },
          });
          const data = await response.json();
          setSearchResults(data.docs);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchValue]);

  return searchResults;
};

export default useSearch;
