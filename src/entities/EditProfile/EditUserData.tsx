import React from 'react';
import { useState } from 'react';
import { supabase } from '../../../backend/apiClient/client.js';

export const EditUserData: React.FC = () => {
  const [newUsername, setNewUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setAvatarFile(selectedFile);
        const base64Data = await fileToBase64(selectedFile);
        setBase64File(base64Data); // Обновляем состояние с base64
        console.log('Base64 representation of selected file:', base64Data);
      }
    } catch (error) {
      console.error('Error handling file change:', error);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const updateAvatar = async (base64Data: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ data: { avatar: base64Data } });
      if (error) {
        throw error;
      }
      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      alert('An error occurred while updating avatar. Please try again later.');
    }
  };

  const handleAvatarSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (base64File) {
        await updateAvatar(base64File);
      }
    } catch (error) {
      console.error('Error updating avatar:', error.message);
      alert('An error occurred while updating avatar. Please try again later.');
    }
  };

  const handleUsernameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({ data: { username: newUsername } });
      if (error) {
        throw error;
      }
      alert('Username updated successfully!');
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
          <form onSubmit={handleAvatarSubmit}>
            <p>Avatar:</p>
            <input
              type='file'
              id='avatar'
              accept='image/*'
              className='bg-[#1a1c1c] w-full mb-4'
              onChange={handleFileChange}
            />
            <button type='submit' className='w-[100px] bg-blue-500'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
