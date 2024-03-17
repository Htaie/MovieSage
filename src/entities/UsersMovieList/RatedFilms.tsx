import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRatingStore } from '../../features/MovieDetails/RatingStar';
import { useStore } from 'effector-react';
import { UserSlice } from '../../features/ProfileInfo/UserSlice';

export const RatedFilms = () => {
  const data = useStore(userRatingStore);
  const [modalImage, setModalImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [linkPosition, setLinkPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (imageUrl, event) => {
    setModalImage(imageUrl);
    setIsHovered(true);
    setLinkPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setModalImage(null);
    setIsHovered(false);
  };

  const shadowStyle = {
    boxShadow: '0px 0px 15px 15px rgba(0, 0, 0, 0.5)',
    MozBoxShadow: '0px 0px 15px 15px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div className='text-white bg-[#6E727A] h-[100%] w-[80%] pb-[400px] mx-auto'>
      {Object.keys(data).map((filmId) => {
        const film = data[filmId];
        return (
          <div key={filmId} className='flex bg-[#45475B] h-[50px] items-center mb-2'>
            <div className='flex-1 flex ml-4'>
              <Link
                to={`/movie/${filmId}`}
                className='text-xl mr-4'
                onMouseEnter={(event) => handleMouseEnter(film.image, event)}
                onMouseLeave={handleMouseLeave}
              >
                {film.title}
              </Link>
              <p className='text-xl'>{film.year}</p>
            </div>
            <div className='flex-1 flex justify-end items-center mr-4'>
              <p className='text-xl mr-4'>{film.clickedRating}/10</p>
              <p className='text-xl'>{film.type}</p>
            </div>
          </div>
        );
      })}
      {isHovered && modalImage && (
        <div
          className='absolute bg-[#45475B] w-[500px]'
          style={{ top: linkPosition.y - 10, left: linkPosition.x + 40, ...shadowStyle }}
        >
          <img src={modalImage} alt='Movie Poster' className='w-[200px]' />
        </div>
      )}
    </div>
  );
};
