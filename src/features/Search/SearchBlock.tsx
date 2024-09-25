import { useEffect, useState } from 'react';
import { SearchResults } from './SearchResults';
import { useSearch } from './useSearch';

export const SearchBlock = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const searchResults = useSearch(debouncedSearchInput);
  console.log(debouncedSearchInput);

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
    <div>
      <input
        type='text'
        placeholder='Поиск'
        className='text-black w-[530px] h-[35px] rounded-[4px] outline-none pl-5'
        value={searchValue}
        onChange={handleInputChange}
      />
      {searchResults && <SearchResults results={searchResults} />}
    </div>
  );
};
