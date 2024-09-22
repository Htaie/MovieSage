import React from 'react';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { updateUserData, userDataStore } from '../../shared/store/UserStore';
import { ChangeUserPhoto } from './ChangeUserPhoto.tsx';
import { CustomInput } from '../../shared/components/CustomInput/CustomInput.tsx';
import { Padding } from '@mui/icons-material';

export const EditUserData: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const user = useStore(userDataStore);

  const handleUsernameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  };

  return (
    <div className='text-white border-2 border-solid border-[#5138E9] rounded-lg p-10 h-[670px] w-[80%] pb-[400px] mx-auto mt-[30px] flex'>
      <div className='w-1/2'>
        <ChangeUserPhoto />
      </div>
      <div className='w-1/2'>
        <div className='h-[140px] mb-[10px] rounded-lg'>
          <p className='text-xl ml-4 pt-3 mb-3'>Изменить имя</p>
          <div className='ml-4 mr-4'>
            <form onSubmit={handleUsernameSubmit}>
              <CustomInput
                type='text'
                id='username'
                label='Username'
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button type='submit' className='w-[100px] bg-blue-500'>
                Сохранить
              </button>
            </form>
          </div>
        </div>
        <div className='h-[250px] mb-[10px] rounded-lg'>
          <p className='text-xl ml-4 pt-3 mb-3'>Изменить пароль</p>
          <div className='ml-4 mr-4'>
            <form onSubmit={handlePasswordSubmit}>
              <CustomInput
                type='password'
                id='newPassword'
                label='Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <CustomInput
                type='password'
                id='confirmNewPassword'
                label='Confirm Password'
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button type='submit' className='w-[100px] bg-blue-500'>
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
