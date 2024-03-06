import React from 'react';
import { useState } from 'react';
import { supabase } from '../../../backend/apiClient/client.js';
import { useStore } from 'effector-react';
import { updateUserData, userDataStore } from '../../shared/store/UserStore';

export const EditUserData: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const user = useStore(userDataStore);

  async function uploadImage(e: any) {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from('images')
      .upload(user?.user?.email + '/' + user?.user?.id, file, {
        contentType: 'image/png',
        upsert: true,
      });
    updateUserData(user);
  }

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
    <div className='text-white h-[1000px] w-[500px] pt-[100px] mx-auto'>
      <div className='bg-[#242626] h-[140px] mb-[10px] rounded-lg'>
        <p className='text-xl ml-4 pt-3'>Изменить имя</p>
        <div className='ml-4 mr-4'>
          <form onSubmit={handleUsernameSubmit}>
            <p>Новое имя:</p>
            <input
              type='text'
              id='username'
              placeholder='Новое имя'
              className='bg-[#1a1c1c] w-full mb-4'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button type='submit' className='w-[100px] bg-blue-500'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className='bg-[#242626] h-[250px] mb-[10px] rounded-lg'>
        <p className='text-xl ml-4 pt-3'>Изменить пароль</p>
        <div className='ml-4 mr-4'>
          <form onSubmit={handlePasswordSubmit}>
            <p>Текущий пароль:</p>
            <input
              type='password'
              id='currentPassword'
              className='bg-[#1a1c1c] w-full mb-4'
              placeholder='Текущий пароль'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <p>Новый пароль:</p>
            <input
              type='password'
              id='newPassword'
              className='bg-[#1a1c1c] w-full mb-4'
              placeholder='Новый пароль'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type='password'
              id='confirmNewPassword'
              className='bg-[#1a1c1c] w-full mb-4'
              placeholder='Подтвердите новый пароль'
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type='submit' className='w-[100px] bg-blue-500'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className='bg-[#242626] h-[150px] rounded-lg'>
        <p className='text-xl ml-4 pt-3'>Изменить фото профиля</p>
        <div className='ml-4 mr-4'>
          <form>
            <p>Avatar:</p>
            <input type='file' accept='image/png, image/jpeg' onChange={(e) => uploadImage(e)} />
            <button type='submit' className='w-[100px] bg-blue-500'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
