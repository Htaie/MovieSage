import { useStore } from 'effector-react';
import { CDNURL, Route } from '../../shared/constants/constants';
import { userDataStore } from '../../shared/store/UserStore';
import { ChangeUserPhoto } from '../../entities/EditProfile/ChangeUserPhoto';
import { Link } from 'react-router-dom';

export const UserSlice = () => {
  const userData = useStore(userDataStore);

  const profileImage = CDNURL + userData.user.email + '/' + userData.user.id;

  return (
    <div className='bg-[#1C3334] h-[1000px] pt-[100px]'>
      <p className='text-white text-3xl'>
        {userData ? userData.user.user_metadata.username : 'No user data available'}
      </p>
      <img
        src={profileImage ? profileImage : 'https://placehold.co/200x200'}
        alt='user avatar'
        className='w-[200px] h-[200px] rounded-full'
      ></img>
      <Link to={Route.RATED} className='text-white'>
        Список оцененных фильмов
      </Link>
      <ChangeUserPhoto />
    </div>
  );
};
