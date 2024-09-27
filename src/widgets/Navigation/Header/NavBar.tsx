import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { GiStarShuriken } from 'react-icons/gi';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  const isAnimeGenre = location.pathname == `/genre/${encodeURIComponent('аниме')}`;
  const isMovieGenre = location.pathname == `/genre/${encodeURIComponent('фильмы')}`;
  const isTvGenre = location.pathname == `/genre/${encodeURIComponent('сериалы')}`;

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

  return (
    <>
      <div
        className={`w-screen hidden md:block bg-[#212124] fixed z-30 transition-all duration-300 ${visible ? 'top-0' : '-top-20'}`}
      >
        <div className='container mx-auto my-0 flex h-20 gap-10 items-center justify-center md:justify-between md:gap-0 text-white'>
          <Link to={'/'} className='flex space-x-3 items-center md:text-3xl'>
            <h1>
              <span className='text-white'>Movie</span>
              <span className='text-[#5138E9]'>Sage</span>
            </h1>
          </Link>
          <div className='flex flex-row-reverse gap-10 md:gap-0 md:flex-row justify-between pr-4 md:w-[500px] lg:w-[660px] xl:w-[860px]'>
            <div className='space-x-5 hidden items-center md:flex'>
              <Link to={'genre/аниме'}>Аниме</Link>
              <Link to={'genre/фильмы'}>Фильмы</Link>
              <Link to={'genre/сериалы'}>Сериалы</Link>
            </div>
            <Link to={'/search'}>
              <SearchIcon className='hover:cursor-pointer  h-4 w-4 text-neutral-3' />
            </Link>
          </div>
        </div>
      </div>
      <div className='fixed flex justify-between bottom-0 w-full bg-[#212124] py-3 px-5 border-t border-[#5138E9] text-white z-30 md:hidden'>
        <Link to={'/'} className='flex flex-col items-center text-xs'>
          <HomeIcon className={`${location.pathname === '/' ? 'text-[#5138E9]' : ''}`} style={{ fontSize: '20px' }} />
          <span>Главная</span>
        </Link>
        <Link to={'genre/аниме'} className='flex flex-col items-center text-xs'>
          <GiStarShuriken className={`${isAnimeGenre ? 'text-[#5138E9]' : ''}`} style={{ fontSize: '20px' }} />
          <span>Аниме</span>
        </Link>
        <Link to={'genre/фильмы'} className='flex flex-col items-center text-xs'>
          <MovieIcon style={{ fontSize: '20px' }} className={`${isMovieGenre ? 'text-[#5138E9]' : ''}`} />
          <span>Фильмы</span>
        </Link>
        <Link to={'genre/сериалы'} className='flex flex-col items-center text-xs'>
          <LiveTvIcon style={{ fontSize: '20px' }} className={`${isTvGenre ? 'text-[#5138E9]' : ''}`} />
          <span>Сериалы</span>
        </Link>
        <Link to={'/search'} className='flex flex-col items-center text-xs'>
          <SearchIcon
            style={{ fontSize: '20px' }}
            className={`${location.pathname === '/search' ? 'text-[#5138E9]' : ''}`}
          />
          <span>Поиск</span>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
