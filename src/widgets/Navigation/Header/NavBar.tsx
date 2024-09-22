import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { userDataStore } from '../../../shared/store/UserStore.js';
import { useStore } from 'effector-react';
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const userData = useStore(userDataStore);
  const location = useLocation();

  const isAnimeGenre = location.pathname == `/genre/${encodeURIComponent('аниме')}`;
  const linkStyle = {
    textDecoration: isAnimeGenre ? 'underline' : 'none',
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchInput, 500]);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={`w-screen bg-[#212124] fixed z-30 transition-all duration-300 ${visible ? 'top-0' : '-top-20'}`}>
      <div className='container mx-auto my-0 flex h-20 items-center justify-between text-white'>
        <Link to={'/'} className='flex space-x-3 items-center text-3xl'>
          <h1>
            <span className='text-white'>Movie</span>
            <span className='text-[#5138E9]'>Sage</span>
          </h1>
        </Link>
        <div className='flex space-x-5'>
          <Link to={'genre/аниме'} style={linkStyle}>
            Аниме
          </Link>
          <Link to={'genre/комедии'}>Фильмы</Link>
          <Link to={'genre/писька'}>Сериалы</Link>
        </div>
        <div className='mt-4 xl:w-96 center'>
          <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
            <input
              type='search'
              className='relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-300 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-300 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
              placeholder='Search'
              aria-label='Search'
              aria-describedby='button-addon2'
              value={searchInput}
              onChange={(e) => {
                handleSearch(e);
              }}
            />
            <SearchIcon className='hover:cursor-pointer absolute top-0 bottom-0 right-1 z-50 m-auto h-4 w-4 text-neutral-3  00' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
