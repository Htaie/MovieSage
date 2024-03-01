import { useState } from 'react';
import { updateUserData } from '../../components/Auth';

export const UserSlice = () => {
  const userDataFromStorage = localStorage.getItem('userData');
  const [userData, setUserData] = useState(userDataFromStorage ? JSON.parse(userDataFromStorage) : null);

  console.log(userData);

  return (
    <div className='h-[1000px] pt-[100px]'>
      <p className='text-white text-3xl'>
        {userData ? userData.user.user_metadata.username : 'No user data available'}
      </p>
      <img
        src={userData ? userData.user.user_metadata.avatar : 'https://placehold.co/200x200'}
        alt='user avatar'
        className='w-[200px] h-[200px] rounded-full'
      ></img>
    </div>
  );
};
