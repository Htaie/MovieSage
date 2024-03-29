import { useState } from 'react';
import { ProfileComponent } from '../../components/ProfileComponent';
import { Route } from '../../shared/constants/constants';
import { Link } from 'react-router-dom';

export const UserSlice = () => {
  const [formType, setFormType] = useState('');

  const handleLinkClick = (newFormType) => {
    setFormType(newFormType);
  };

  return (
    <div className='bg-[#212124] h-[200px] pt-[100px] pb-[50%]'>
      <div className='flex space-x-5 text-2xl ml-[195px]'>
        <Link to='#' onClick={() => handleLinkClick('ratedlist')} className='text-white'>
          Просмотренные
        </Link>
        <Link to='#' onClick={() => handleLinkClick('planned')} className='text-white'>
          Смотреть позже
        </Link>
        <Link to='#' onClick={() => handleLinkClick('settings')} className='text-white'>
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
