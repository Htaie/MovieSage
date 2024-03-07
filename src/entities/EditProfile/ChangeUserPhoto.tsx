import { updateUserData, userDataStore } from '../../shared/store/UserStore';
import { supabase } from '../../../backend/apiClient/client.js';
import { useStore } from 'effector-react';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const ChangeUserPhoto = () => {
  const user = useStore(userDataStore);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  async function uploadImage() {
    if (!selectedFile) return;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${user?.user?.email}/${user?.user?.id}`, selectedFile, {
        contentType: 'image/png',
        upsert: true,
      });

    if (!error) {
      updateUserData(user);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewImage(imageUrl);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      await uploadImage();
    }
  };

  return (
    <div className='text-white h-[150px] rounded-lg'>
      <p className='text-xl ml-4 pt-3 mb-4'>Аватар</p>
      <div className='ml-4 mr-4'>
        <form>
          <div className='flex'>
            <label htmlFor='file-input' onDragOver={handleDragLeave} onDragEnter={handleDragEnter} onDrop={handleDrop}>
              <div className='border-dashed border-2 border-white w-[150px] h-[150px] text-center cursor-pointer mb-4 mr-4'>
                <CloudUploadIcon style={{ fontSize: '30px' }} />
                <p className='text-xl'>Нажмите или перетащите изображение для загрузки</p>
              </div>
            </label>
            {previewImage && (
              <div className='w-[155px] h-[155px]'>
                <img src={previewImage} alt='Preview' className='w-full h-full object-cover' />
              </div>
            )}
          </div>
          <input
            id='file-input'
            type='file'
            accept='image/png, image/jpeg'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button type='button' className='w-[100px] bg-blue-500 active:brightness-90' onClick={uploadImage}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};
