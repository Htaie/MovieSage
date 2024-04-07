import { useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ModalUploadPhoto from './ModalUploadPhoto';
import { useStore } from 'effector-react';
import { supabase } from '../../../backend/apiClient/client.js';
import { CDNURL, SUPABASE_KEY } from '../../shared/constants/constants';
import { userDataStore } from '../../shared/store/UserStore';

export const ChangeUserPhoto = () => {
  const user = useStore(userDataStore);
  const profileImage = CDNURL + user.user.email + '/' + user.user.id;

  const selectedFile = useRef('https://avatarfiles.alphacoders.com/161/160002.jpg');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<boolean>(false);

  const updateAvatar = (imgSrc) => {
    selectedFile.current = imgSrc;
  };
  console.log(selectedFile.current, 'selectedFile');
  async function uploadImage() {
    if (!selectedFile) return;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`${user?.user?.email}/${user?.user?.id}`, selectedFile.current, {
        contentType: 'image/png',
        upsert: true,
      });

    if (!error) {
      console.log('File uploaded successfully!');
    }
  }

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      selectedFile.current = files[0];
    }
  };
  return (
    <div className='text-white h-[150px] rounded-lg flex flex-col items-center pt-3'>
      <div className='relative' onMouseEnter={() => setLabel(true)} onMouseLeave={() => setLabel(false)}>
        <img
          src={selectedFile.current}
          alt='user avatar'
          className='w-[200px] h-[200px] rounded-full object-cover border-4 border-[#5138E9]'
        />
        {label && (
          <label
            htmlFor='file-input'
            onClick={() => setModalOpen(true)}
            className='absolute bg-[#1a1c1c] rounded-full border-4 border-[#5138E9] inset-0 flex items-center justify-center w-full h-full cursor-pointer'
          >
            <CloudUploadIcon style={{ fontSize: '170px', color: '#5138E9' }} />
          </label>
        )}
      </div>
      <p className='text-white text-3xl'>Username</p>
      <p className='text-xl ml-4 pt-3 mb-4'>Загрузить аватар</p>
      <div className='ml-4 mr-4'>
        <form>
          <div className='flex'>
            <label htmlFor='file-input'>
              <div className='border-dashed border-4 border-[#6E707A] w-[550px] h-[250px] text-center cursor-pointer mb-4 mr-4'>
                <CloudUploadIcon style={{ fontSize: '30px' }} />
                <p className='text-xl'>Нажмите или перетащите изображение для загрузки</p>
              </div>
            </label>
          </div>
          <input
            id='file-input'
            type='file'
            accept='image/png, image/jpeg'
            // onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </form>
        <button onClick={() => uploadImage()}>dfgdsfgfhgd</button>
        {modalOpen && <ModalUploadPhoto updateAvatar={updateAvatar} closeModal={() => setModalOpen(false)} />}
      </div>
    </div>
  );
};
