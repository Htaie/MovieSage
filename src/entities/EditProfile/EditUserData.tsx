import React from 'react';
import { useState } from 'react';
import { supabase } from '../../../backend/apiClient/client.js';
import { useStore } from 'effector-react';
import { updateUserData, userDataStore } from '../../shared/store/UserStore';
import { ChangeUserPhoto } from './ChangeUserPhoto.tsx';
import { CustomInput } from '../../shared/components/CustomInput/CustomInput.tsx';

export const EditUserData: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const user = useStore(userDataStore);

  const handleUsernameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({ data: { username: newUsername } });
      if (error) {
        throw error;
      }
      alert('Username updated successfully!');
      updateUserData({
        ...user,
        user: { ...user?.user, user_metadata: { ...user?.user?.user_metadata, username: newUsername } },
      });
    } catch (error) {
      console.error('Error updating username:', error.message);
      alert('An error occurred while updating username. Please try again later.');
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newPassword === confirmNewPassword) {
        const { error } = await supabase.auth.updateUser({ password: newPassword }, { password: currentPassword });
        if (error) {
          throw error;
        }
        alert('Password updated successfully!');
      } else {
        throw new Error('New password and confirm password do not match.');
      }
    } catch (error) {
      console.error('Error updating password:', error.message);
      alert('An error occurred while updating password. Please try again later.');
    }
    updateUserData(user);
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
