import SearchIcon from '@mui/icons-material/Search';
import { SearchResults } from './SearchResults';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import useSearch from './SearchHooks';

export const SearchComponent = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchResults = useSearch(searchValue);

  const isAnimeGenre = location.pathname == `/genre/${encodeURIComponent('аниме')}`;
  const linkStyle = {
    textDecoration: isAnimeGenre ? 'underline' : 'none',
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node | null)) {
      setShowSearchInput(false);
      setShowSearchResults(false);
      setSearchValue('');
    }
  };

  const handleWheel = (event: WheelEvent) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node | null)) {
      setShowSearchInput(false);
      setShowSearchResults(false);
      setSearchValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('wheel', handleWheel);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    setShowSearchResults(false);
    setSearchValue('');
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
    setShowSearchResults(value.length > 0);
  };

  const inputVariants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  };

  return (
    <>
      <div
        ref={searchContainerRef}
        className={`${showSearchInput ? 'hidden' : ''} ml-[135px] absolute flex space-x-5 z-10`}
      >
        <Link to={'genre/anime'} style={linkStyle}>
          Аниме
        </Link>
        <Link to={'genre/movie'}>Фильмы</Link>
        <Link to={'genre/tv-series'}>Сериалы</Link>
        <SearchIcon className='ml-5 hover:cursor-pointer hover:text-[#5138E9]' onClick={toggleSearchInput} />
      </div>
      <div ref={searchContainerRef} className='flex'>
        <div className='flex items-center relative w-[530px]' style={{ overflow: 'hidden' }}>
          <motion.div
            animate={showSearchInput ? 'open' : 'closed'}
            variants={inputVariants}
            transition={{ duration: 0.1 }}
          >
            <input
              type='text'
              placeholder='Поиск'
              className='text-black w-[530px] h-[35px] rounded-[4px] outline-none pl-5'
              value={searchValue}
              onChange={handleInputChange}
            ></input>
          </motion.div>
          {showSearchInput && (
            <CloseIcon
              className='text-gray-500 absolute right-2 cursor-pointer'
              style={{ fontSize: '25px' }}
              onClick={toggleSearchInput}
            />
          )}
        </div>
        {showSearchResults && (
          <SearchResults
            searchResults={searchResults}
            searchValue={searchValue}
            closeSearchResults={toggleSearchInput}
            hideMargin={false}
          />
        )}
      </div>
    </>
  );
};
