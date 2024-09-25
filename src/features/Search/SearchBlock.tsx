import { useEffect, useState } from 'react';
import { SearchResults } from './SearchResults';
import { useSearch } from './useSearch';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBlock = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const searchResults = useSearch(debouncedSearchInput);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className='mx-auto flex relative w-full md:w-[530px]'>
        <input
          type='text'
          placeholder='Поиск'
          className='text-black w-full md:w-[530px] h-[35px] rounded-[4px] outline-none pl-5'
          value={searchValue}
          onChange={handleInputChange}
        />
        <SearchIcon className='absolute right-2 top-1/2 -translate-y-1/2 text-black' />
      </div>
      {searchResults && <SearchResults results={searchResults} />}
    </>
  );
};
