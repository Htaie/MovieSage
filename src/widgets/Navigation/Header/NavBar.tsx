import { Link, useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import GenreLinkSlider from '../../../features/GenreCarousel/GenreLinkSlider';
import { useState } from 'react';

const NavBar = () => {

  const location = useLocation();
  const browse = location.pathname === '/browse';
  const watchlist = location.pathname === '/watchlist';
  const notifications = location.pathname === '/notifications';

  
  return (
    <>
      <div className={`  w-2/12  h-screen block bg-[#151515] fixed z-30 top-0`}>
        <div className='ml-14  items-start mt-6'>
          <Link to={'/'} className='text-3xl'>
            <span className='text-white'>Movie</span>
            <span className='text-[#5138E9]'>Sage</span>
          </Link>
          <div className='text-white mt-14 flex flex-col mb-14 gap-5 '>
            <p className=' text-[#707070]'>New feed</p>
            <Link to='/browse'  className={`text-[18px] border-left ${browse ? 'border-r-2' : ''}`} >
              <ExploreOutlinedIcon style={{fontSize: '28px'}} className='text-[#707070] mr-2  mb-1'/>
              Browse
            </Link>
            <Link to='/watchlist' className={`text-[18px] border-left ${watchlist ? 'border-r-2' : ''}`}>
              <FavoriteBorderIcon style={{fontSize: '28px'}}  className='text-[#707070] mr-2 mb-1'/>
              Watchlist
            </Link>
            <Link to='/notifications' className={`text-[18px] border-left ${notifications ? 'border-r-2' : ''}`}>
              {' '}
              <NotificationsNoneOutlinedIcon  style={{fontSize: '28px'}} className='text-[#707070] mr-2 mb-1'/>
              Notifications
            </Link>
          </div>
          <div>
            <div>
              <p className=' mb-3  text-[#707070]'>Categories</p>
              <GenreLinkSlider />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
