import { useEffect, useState } from 'react';
import { ProfileComponent } from '../../components/ProfileComponent';
import { PROFILE_ROUTE, Route } from '../../shared/constants/constants';
import { Link, useLocation } from 'react-router-dom';

export const UserSlice = () => {
  const [formType, setFormType] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === Route.RATED) {
      setFormType(PROFILE_ROUTE.RATED);
    } else if (location.pathname === Route.PLAN) {
      setFormType(PROFILE_ROUTE.PLAN);
    } else if (location.pathname === Route.SETTINGS) {
      setFormType(PROFILE_ROUTE.SETTINGS);
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
          to={Route.RATED}
          style={formType === PROFILE_ROUTE.RATED ? { ...linkStyle, textDecoration: 'underline' } : linkStyle}
          className='text-white'
        >
          Просмотренные
        </Link>
        <Link
          to={Route.PLAN}
          style={formType === PROFILE_ROUTE.PLAN ? { ...linkStyle, textDecoration: 'underline' } : linkStyle}
          className='text-white'
        >
          Смотреть позже
        </Link>
        <Link
          to={Route.SETTINGS}
          style={formType === PROFILE_ROUTE.SETTINGS ? { ...linkStyle, textDecoration: 'underline' } : linkStyle}
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
