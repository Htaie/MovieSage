import { useStore } from 'effector-react';
import { CDNURL } from '../../shared/constants/constants';
import { userDataStore } from '../../shared/store/UserStore';

export const UserSlice = () => {
  const userData = useStore(userDataStore);

  const profileImage = CDNURL + userData.user.email + '/' + userData.user.id;

  return (
    <div className='h-[1000px] pt-[100px]'>
      <p className='text-white text-3xl'>
        {userData ? userData.user.user_metadata.username : 'No user data available'}
      </p>
      <img
        src={profileImage ? profileImage : 'https://placehold.co/200x200'}
        alt='user avatar'
        className='w-[200px] h-[200px] rounded-full'
      ></img>
    </div>
  );
};
