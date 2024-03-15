import { Route } from '../../shared/constants/constants';
import { Link } from 'react-router-dom';

export const UserSlice = () => {
  return (
    <div className='bg-[#212124] h-[1000px] pt-[100px]'>
      <div className='flex space-x-5 text-2xl ml-[195px]'>
        <Link to={Route.RATED} className='text-white'>
          Просмотренные
        </Link>
        <Link to={Route.RATED} className='text-white'>
          Смотреть позже
        </Link>
        <Link to={Route.SETTINGS} className='text-white'>
          Настройки
        </Link>
        <Link to={Route.HOME} className='text-red-500'>
          Выйти
        </Link>
      </div>
    </div>
  );
};
