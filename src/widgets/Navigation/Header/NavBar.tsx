import { Link, Routes, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../backend/apiClient/client.js';
import { userDataStore, updateUserData } from '../../../shared/store/UserStore.js';
import { CDNURL, Route } from '../../../shared/constants/constants.js';
import { useStore } from 'effector-react';
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const userData = useStore(userDataStore);
  const location = useLocation();

  const isAnimeGenre = location.pathname == `/genre/${encodeURIComponent('аниме')}`;
  const linkStyle = {
    textDecoration: isAnimeGenre ? 'underline' : 'none',
  };
  const isLoggedIn = userData;

  const profileImage = CDNURL + userData?.user?.email + '/' + userData?.user?.id;

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      togglePanel();
      updateUserData(null);
    }
  };

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

  // useEffect(() => {
  //   // Сохраняем данные пользователя в localStorage при изменении
  //   localStorage.setItem('userData', JSON.stringify(userData));
  // }, [userData]);

  const togglePanel = () => {
    setOpen(!open);
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
        <div className='flex space-x-3 items-center'>
          <SearchIcon className='hover:cursor-pointer' />
          {isLoggedIn ? (
            <>
              <NotificationsNoneIcon />
              <Link to={Route.PROFILE}>
                <img
                  className='w-10 h-10 rounded-full'
                  src={
                    profileImage
                      ? profileImage
                      : 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
                  }
                  alt='Profile Img'
                />
              </Link>
              <KeyboardArrowDownIcon onClick={togglePanel} />
              {open && (
                <div className='absolute flex flex-col bg-[#212124] mt-[275px] text-xl w-[160px] h-[220px] rounded-lg'>
                  <p className='text-2xl py-3 ml-2'>
                    {userData ? userData.user.user_metadata.username : 'No user data available'}
                  </p>
                  <Link to={Route.PROFILE} onClick={togglePanel} className='py-3 ml-2'>
                    Profile
                  </Link>
                  <Link to={Route.SETTINGS} onClick={togglePanel} className='py-3 ml-2'>
                    Settings
                  </Link>
                  <Link to={Route.HOME} onClick={SignOut} className='py-3 ml-2'>
                    Sign Out
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <Link className='border bg-white text-black px-3 py-1 rounded-md' to={'/register'}>
                Sign Up
              </Link>
              <Link className='border border-[#5138E9] bg-[#5138E9] px-3 py-1 rounded-md' to={'/login'}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
