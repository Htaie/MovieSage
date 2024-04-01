import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
// Функция для обрезки изображения
export const getCroppedImg = async (imageSrc: string, crop: { x: number; y: number }, aspectRatio: number) => {
  const image = new Image();
  image.src = imageSrc;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = aspectRatio * crop.width!;
  canvas.height = crop.height!;
  ctx.drawImage(image, crop.x!, crop.y!, crop.width!, crop.height!, 0, 0, canvas.width, canvas.height);
  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, 'image/jpeg');
  });
};

export const ChangeUserPhoto = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const handleFinishCrop = async () => {
    if (!crop.width || !crop.height) {
      console.error('Invalid crop area');
      return;
    }
    const croppedImage = await getCroppedImg(previewImage, crop, 4 / 3);
    setModalIsOpen(false);
    console.log(crop);
    setCroppedImage(croppedImage);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewImage(imageUrl);
      setModalIsOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setPreviewImage(null);
  };

  return (
    <div className='text-white h-[150px] rounded-lg flex flex-col items-center pt-3'>
      {previewImage && (
        <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className='bg-white p-4 rounded-lg h-96 w-96'>
          <Cropper
            image={previewImage}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className='absolute bottom-0 flex justify-center mt-48'>
            <button
              onClick={handleModalClose}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Отмена
            </button>
            <button
              onClick={handleFinishCrop}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Окей
            </button>
          </div>
        </Modal>
      )}
      <div className='relative'>
        <img
          src={previewImage ? previewImage : 'https://placehold.co/200x200'}
          alt='user avatar'
          className='w-[200px] h-[200px] rounded-full object-cover border-4 border-[#5138E9]'
        />
        <label
          htmlFor='file-input'
          className='absolute bg-[#1a1c1c] rounded-full border-4 border-[#5138E9] inset-0 flex items-center justify-center w-full h-full cursor-pointer'
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileChange(e);
          }}
        >
          <CloudUploadIcon style={{ fontSize: '170px', color: '#5138E9' }} />
        </label>
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
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </form>
      </div>
    </div>
  );
};
