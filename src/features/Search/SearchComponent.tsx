import SearchIcon from '@mui/icons-material/Search';
import { SearchResults } from './SearchResults';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { createStore, createEvent } from 'effector';
import { API_URL, SECOND_TOKEN } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';
import { Link, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export const updateSearchResults = createEvent<MovieType[]>('update search results');

export const searchResultsStore = createStore<MovieType[]>([]).on(updateSearchResults, (_, results) => results);

export const SearchComponent = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();

  const isAnimeGenre = location.pathname == `/genre/${encodeURIComponent('аниме')}`;
  const linkStyle = {
    textDecoration: isAnimeGenre ? 'underline' : 'none',
  };

  useEffect(() => {
    const unsubscribe = searchResultsStore.watch((results) => {
      if (Array.isArray(results)) {
        setShowSearchResults(results.length > 0);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchValue.length > 1) {
          const response = await fetch(`${API_URL}movie/search?page=1&limit=10&query=${searchValue}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'X-API-KEY': SECOND_TOKEN,
            },
          });
          const data = await response.json();
          updateSearchResults(data.docs as MovieType[]);
        } else {
          updateSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchValue]);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setSearchValue(value);
    setShowSearchResults(value.length > 0);
  };

  // const inputVariants = {
  //   open: { opacity: 1, x: 0 },
  //   closed: { opacity: 0, x: '200%' },
  // };

  const inputVariants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0 },
  };

  return (
    <>
      <div className={`${showSearchInput ? 'hidden' : ''} ml-[135px] absolute flex space-x-5 z-10`}>
        <Link to={'genre/аниме'} style={linkStyle}>
          Аниме
        </Link>
        <Link to={'genre/комедии'}>Фильмы</Link>
        <Link to={'genre/писька'}>Сериалы</Link>
        <SearchIcon className='ml-5 hover:cursor-pointer hover:text-[#5138E9]' onClick={toggleSearchInput} />
      </div>
      <div className='flex'>
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
        {showSearchResults && <SearchResults />}
      </div>
    </>
  );
};
