import React, { useEffect, useState } from 'react';
import { ModalDataType } from '../../types/ModalDataTypes';

interface Props {
  modalData: ModalDataType;
  isHovered: boolean;
  linkPosition: { x: number; y: number };
  setIsHovered: (value: boolean) => void;
  currentLink: number | null;
}

const MovieModal: React.FC<Props> = ({ modalData, isHovered, linkPosition, setIsHovered, currentLink }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalHovered, setIsModalHovered] = useState(false);

  useEffect(() => {
    if (isHovered && modalData.id === currentLink) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        if (!isModalHovered) {
          setIsVisible(false);
        }
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isHovered, currentLink, modalData.id, isModalHovered]);

  const handleModalEnter = () => {
    setIsHovered(true);
    setIsModalHovered(true);
    setIsVisible(true);
  };

  const handleModalLeave = () => {
    setIsHovered(false);
    setIsModalHovered(false);
    setIsVisible(false);
  };

  if (!isVisible || !modalData.image) {
    return null;
  }

  const shadowStyle = {
    boxShadow: '0px 0px 15px 15px rgba(0, 0, 0, 0.5)',
    MozBoxShadow: '0px 0px 15px 15px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div
      className='absolute bg-[#45475B] w-[510px] h-[300px]'
      style={{ top: linkPosition.y - 10, left: linkPosition.x + 40, ...shadowStyle }}
      onMouseEnter={handleModalEnter}
      onMouseLeave={handleModalLeave}
    >
      <div className='flex'>
        <img
          src={modalData.image || 'https://via.placeholder.com/180x280'}
          alt='Movie Poster'
          className='w-[165px] h-[235px] ml-2 mt-2 mr-3'
        />
        <div className='text-xl'>
          <p className='font-bold mb-2'>{modalData.title}</p>
          <p className='text-sm mb-2'>{modalData.shortDescription}</p>
          <div className='flex'>
            <p className='font-bold mr-2'>Тип:</p>
            <span>{modalData.type}</span>
          </div>
          <div className='flex'>
            <p className='font-bold mr-2'>Год:</p>
            <span>{modalData.year}</span>
          </div>
          {modalData.genres && (
            <div className='flex'>
              <p className='font-bold mr-2'>Жанр:</p>
              {modalData.genres.slice(0, 3).map((genreObj, index) => (
                <p key={index} className='mr-1'>
                  {genreObj.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex text-xl ml-2'>
          <p className='mr-2'>Просмотрено -</p>
          <p className='font-bold'>{modalData.clickedRating}/10</p>
        </div>
        <div className='flex text-xl mr-2'>
          <p className='mr-2'>рейтинг:</p>
          <p className='font-bold'>{modalData.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
