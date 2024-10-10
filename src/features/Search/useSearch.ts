import { useState, useEffect } from 'react';
import { API_URL, TOKEN } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';

export const useSearch = ({
  debouncedSearchInput,
  pageNumber,
  query,
}: {
  debouncedSearchInput: string;
  pageNumber: number;
  query?: string;
}) => {
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [maxPages, setMaxPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isNewSearch, setIsNewSearch] = useState(true);
  const [ignoreQuery, setIgnoreQuery] = useState(false);

  useEffect(() => {
    const searchTerm = ignoreQuery ? debouncedSearchInput : query || debouncedSearchInput;
    if (!searchTerm) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        if (isNewSearch) {
          setSearchResults([]);
        }
        if (searchTerm.length > 1) {
          const response = await fetch(
            `${API_URL}movie/search?page=${pageNumber}&limit=25&notNullFields=poster.url&query=${decodeURIComponent(searchTerm)}`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'X-API-KEY': TOKEN,
              },
            }
          );
          const result = await response.json();
          setSearchResults((prevResults) => (isNewSearch ? result.docs : [...prevResults, ...result.docs]));
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
  }, [debouncedSearchInput, pageNumber, query, ignoreQuery]);

  useEffect(() => {
    setIsNewSearch(true);
  }, [debouncedSearchInput, query]);

  useEffect(() => {
    if (debouncedSearchInput) {
      setIgnoreQuery(true);
    }
  }, [debouncedSearchInput]);

  return {
    searchResults,
    setSearchResults,
    maxPages,
    loading,
  };
};
