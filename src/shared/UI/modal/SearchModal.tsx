import { useState } from 'react';
import useSearch from '../../../features/Search/SearchHooks';
import { SearchResults } from '../../../features/Search/SearchResults';

export const SearchModal = () => {
  const [searchValue, setSearchValue] = useState('');
  const searchResults = useSearch(searchValue);

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  return (
    <>
      <input
        type='text'
        placeholder='Поиск'
        className='text-black w-[530px] h-[35px] rounded-[4px] outline-none pl-5'
        value={searchValue}
        onChange={handleInputChange}
      ></input>
      <SearchResults
        searchResults={searchResults}
        searchValue={searchValue}
        closeSearchResults={() => {}}
        hideMargin={true}
      />
    </>
  );
};
