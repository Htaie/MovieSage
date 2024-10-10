import { useEffect, useState } from 'react';
import { SearchResults } from './SearchResults';
import { useSearch } from './useSearch';
import SearchIcon from '@mui/icons-material/Search';
import MainLoader from '../../shared/loader/MainLoader';
import { useParams } from 'react-router-dom';

export const SearchBlock = () => {
  const { query } = useParams<{ query: string }>();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { searchResults, maxPages, loading } = useSearch({ debouncedSearchInput, pageNumber, query });

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        document.body.scrollTop + (document.documentElement.scrollTop !== 0 ? document.documentElement.scrollTop : 0);

      if (!loading && windowHeight + scrollTop >= documentHeight - 400 && pageNumber < maxPages) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber, maxPages, loading]);

  return (
    <>
      <div className='mx-auto flex relative w-full md:w-[530px] mb-4'>
        <input
          type='text'
          placeholder='Поиск'
          className='text-black w-full md:w-[530px] h-[35px] rounded-[4px] outline-none pl-5'
          value={searchValue}
          onChange={handleInputChange}
        />
        <SearchIcon className='absolute right-2 top-1/2 -translate-y-1/2 text-black' />
      </div>
      {searchResults ? <SearchResults results={searchResults} /> : null}
      <div className='flex justify-center'>{loading && pageNumber > 1 && <MainLoader />}</div>
    </>
  );
};
