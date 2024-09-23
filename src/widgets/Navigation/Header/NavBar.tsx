import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const [menuClass, setMenuClass] = useState('translate-y-6');

  useEffect(() => {
    if (openMenu) {
      setMenuClass('translate-y-14');
    } else {
      setMenuClass('translate-y-6');
    }
  }, [openMenu]);

  useEffect(() => {
    if (!visible) {
      setOpenMenu(false);
    }
  }, [visible]);

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
      <div className='container mx-auto my-0 flex h-20 gap-10 items-center justify-center md:justify-between md:gap-0 text-white'>
        <Link to={'/'} className='flex space-x-3 items-center md:text-3xl'>
          <h1>
            <span className='text-white'>Movie</span>
            <span className='text-[#5138E9]'>Sage</span>
          </h1>
        </Link>
        <div className='flex flex-row-reverse gap-10 md:gap-0 md:flex-row justify-between md:w-[500px] lg:w-[660px] xl:w-[860px]'>
          <div className='space-x-5 hidden items-center md:flex'>
            <Link to={'genre/аниме'} style={linkStyle}>
              Аниме
            </Link>
            <Link to={'genre/комедии'}>Фильмы</Link>
            <Link to={'genre/писька'}>Сериалы</Link>
          </div>
          <div className='flex items-center md:hidden'>
            <MenuIcon onClick={() => setOpenMenu(!openMenu)} />
          </div>
          <div className='mt-4 xl:w-96'>
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
      {openMenu && (
        <div
          className={`w-full bg-[#212124] p-5 border-y border-[#5138E9] text-white text-center fixed z-30 transition-transform duration-300 ease-in-out transform ${menuClass} md:hidden`}
          style={{ top: '20px' }}
        >
          <Link to={'genre/аниме'} className='m-2 p-3' style={linkStyle}>
            Аниме
          </Link>
          <Link to={'genre/комедии'} className='m-2 p-3'>
            Фильмы
          </Link>
          <Link to={'genre/писька'} className='m-2 p-3'>
            Сериалы
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
