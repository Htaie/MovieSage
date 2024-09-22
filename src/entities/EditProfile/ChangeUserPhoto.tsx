import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Modal from 'react-modal';
import Cropper from 'react-easy-crop';
import { useStore } from 'effector-react';
import { userDataStore, updateUserData } from '../../shared/store/UserStore.js';

export const ChangeUserPhoto = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number; height: number; x: number; y: number }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [label, setLabel] = useState<boolean>(false);
  const user = useStore(userDataStore);
  const timestamp = Date.now();

  const blobToFile = (blob: Blob, fileName: string): File => {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  };

  const uploadImage = async (croppedImage: string | null, fileName: string) => {
    if (!croppedImage) return;

    const response = await fetch(croppedImage);
    const blob = await response.blob();
    const file = blobToFile(blob, fileName);

    if (!error) {
      updateUserData(user);
    }
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImg = async (
    imageSrc: string,
    croppedAreaPixels: { width: number; height: number; x: number; y: number }
  ) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
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

  const handleFinishCrop = async () => {
    if (crop.x === undefined || crop.y === undefined) {
      console.error('Invalid crop area');
      return;
    }
    const croppedImage = await getCroppedImg(previewImage, croppedAreaPixels);
    setModalIsOpen(false);
    setCroppedImage(croppedImage);
    uploadImage(croppedImage, `${user?.user?.id}.png`);
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
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          className='flex items-center justify-center'
          overlayClassName='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
        >
          <div className='bg-[#212124] w-[720px] h-[440px] rounded-lg relative'>
            <div className='bg-white w-[670px] h-[350px] relative mx-auto mt-4'>
              <Cropper
                image={previewImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                style={{
                  containerStyle: {
                    width: '100%',
                    height: '100%',
                  },
                  mediaStyle: {
                    maxWidth: '100%',
                    maxHeight: '100%',
                  },
                }}
              />
            </div>
            <div className='absolute bottom-0 flex justify-center mt-48 ml-[25px] mb-5'>
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
          </div>
        </Modal>
      )}
      <div className='relative' onMouseEnter={() => setLabel(true)} onMouseLeave={() => setLabel(false)}>
        <img
          src={croppedImage ? croppedImage : profileImage ? profileImage : 'https://placehold.co/200x200'}
          alt='user avatar'
          className='w-[200px] h-[200px] rounded-full object-cover border-4 border-[#5138E9]'
        />
        {label && (
          <label
            htmlFor='file-input'
            className='absolute bg-[#1a1c1c] rounded-full border-4 border-[#5138E9] inset-0 flex items-center justify-center w-full h-full cursor-pointer'
          >
            <CloudUploadIcon style={{ fontSize: '170px', color: '#5138E9' }} />
          </label>
        )}
      </div>
      <p className='text-white text-3xl'>Username</p>
    </div>
  );
};
