import { useStore } from 'effector-react';
import { userDataStore, updateUserData } from '../../components/Auth';

export const UserSlice = () => {
  const userData = useStore(userDataStore);

  console.log(userData);

  return (
    <div className='h-[1000px]'>
      <img
        src={userData ? userData.user.user_metadata.avatar : 'https://placehold.co/200x200'}
        alt='user avatar'
        className='w-[200px] h-[200px] rounded-lg'
      ></img>
      <p>Пользователь: {userData ? userData.user.user_metadata.username : 'No user data available'}</p>
      {/* Проверяем, есть ли данные пользователя, и выводим имя пользователя, если они доступны */}
    </div>
  );
};
