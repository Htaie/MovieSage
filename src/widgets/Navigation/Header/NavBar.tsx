import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../backend/apiClient/client.js';
import { userDataStore, updateUserData } from '../../../shared/store/UserStore.js';
import { CDNURL } from '../../../shared/constants/constants.js';
import { useStore } from 'effector-react';
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const userData = useStore(userDataStore);
  const isLoggedIn = userData;

  const profileImage = CDNURL + userData?.user?.email + '/' + userData?.user?.id;

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
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

  const gradientBackground = {
    background:
      'linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,.595) 6.67%, rgba(0,0,0,.579) 13.33%, rgba(0,0,0,.551) 20%, rgba(0,0,0,.512) 26.67%, rgba(0,0,0,.461) 33.33%, rgba(0,0,0,.401) 40%, rgba(0,0,0,.334) 46.67%, rgba(0,0,0,.266) 53.33%, rgba(0,0,0,.199) 60%, rgba(0,0,0,.139) 66.67%, rgba(0,0,0,.088) 73.33%, rgba(0,0,0,.049) 80%, rgba(0,0,0,.021) 86.67%, rgba(0,0,0,.005) 93.33%, transparent)',
  };
  return (
    <div
      className={`w-screen fixed z-30 transition-all duration-300 ${visible ? 'top-0' : '-top-20'}`}
      style={gradientBackground}
    >
      <div className='container mx-auto my-0 flex h-32 items-center justify-between text-white'>
        <Link to={'/'} className='flex space-x-3 items-center'>
          <h1>MovieSage</h1>
        </Link>
        <div className='flex space-x-5'>
          <Link to={'genre/аниме'}>Anime</Link>
          <Link to={'/'}>About</Link>
          <Link to={'/'}>Contact</Link>
          <Link to={'/'}>Contact</Link>
          <Link to={'/'}>SearchFilmTest</Link>
        </div>
        <div className='flex space-x-3 items-center'>
          <SearchIcon className='hover:cursor-pointer' />
          {isLoggedIn ? (
            <>
              <NotificationsNoneIcon />
              <Link to={'/profile'}>
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
                <div className='absolute flex flex-col bg-[#1C3334] mt-[275px] text-xl w-[160px] h-[220px] rounded-lg'>
                  <p className='text-2xl py-3 ml-2'>
                    {userData ? userData.user.user_metadata.username : 'No user data available'}
                  </p>
                  <Link to='/profile' onClick={togglePanel} className='py-3 ml-2'>
                    Profile
                  </Link>
                  <Link to='/settings' onClick={togglePanel} className='py-3 ml-2'>
                    Settings
                  </Link>
                  <Link to='/' onClick={SignOut} className='py-3 ml-2'>
                    Sign Out
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <Link className='border px-3 py-1 rounded-md' to={'/register'}>
                Sign Up
              </Link>
              <Link className='border border-green-700 bg-green-700 px-3 py-1 rounded-md' to={'/login'}>
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
