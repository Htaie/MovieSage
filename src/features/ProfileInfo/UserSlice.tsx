import { useEffect, useState } from 'react';
import { ProfileComponent } from '../../components/ProfileComponent';
import { LISTS, Route } from '../../shared/constants/constants';
import { Link, useLocation } from 'react-router-dom';

export const UserSlice = () => {
  const [formType, setFormType] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/profile/ratedlist') {
      setFormType(LISTS.RATED);
    } else if (location.pathname === '/profile/planlist') {
      setFormType(LISTS.PLAN);
    } else if (location.pathname === '/profile/settings') {
      setFormType('settings');
    } else {
      setFormType('');
    }
  }, [location.pathname]);

  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <div className='bg-[#212124] h-[200px] pt-[100px] pb-[50%]'>
      <div className='flex space-x-5 text-2xl ml-[195px]'>
        <Link
          to='/profile/ratedlist'
          style={formType === LISTS.RATED ? { ...linkStyle, textDecoration: 'underline' } : linkStyle}
          className='text-white'
        >
          Просмотренные
        </Link>
        <Link
          to='/profile/planlist'
          style={formType === LISTS.PLAN ? { ...linkStyle, textDecoration: 'underline' } : linkStyle}
          className='text-white'
        >
          Смотреть позже
        </Link>
        <Link
          to='/profile/settings'
          style={formType === 'settings' ? { ...linkStyle, textDecoration: 'underline' } : linkStyle}
          className='text-white'
        >
          Настройки
        </Link>
        <Link to={Route.HOME} className='text-red-500'>
          Выйти
        </Link>
      </div>
      <ProfileComponent formType={formType} />
    </div>
  );
};
