import { useState, useEffect } from 'react';
import { API_URL, TOKEN } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';

export const useSearch = ({
  debouncedSearchInput,
  pageNumber,
}: {
  debouncedSearchInput: string;
  pageNumber: number;
}) => {
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [maxPages, setMaxPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedSearchInput) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        if (debouncedSearchInput.length > 1) {
          const response = await fetch(
            `${API_URL}movie/search?page=${pageNumber}&limit=25&notNullFields=poster.url&query=${debouncedSearchInput}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'X-API-KEY': TOKEN,
              },
            }
          );
          const result = await response.json();
          setSearchResults((prevResults) => [...prevResults, ...result.docs]);
          setMaxPages(result.pages);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearchInput, pageNumber]);

  return {
    searchResults,
    maxPages,
    loading,
  };
};
