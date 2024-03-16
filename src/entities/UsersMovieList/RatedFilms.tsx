import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRatingStore } from '../../features/MovieDetails/RatingStar';
import { useStore } from 'effector-react';

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

  return (
    <div className='text-white bg-[#6E727A] h-[100%] w-[70%] pt-[100px] pb-[400px] mx-auto'>
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
        <div className='absolute' style={{ top: linkPosition.y, left: linkPosition.x + 20 }}>
          <img src={modalImage} alt='Movie Poster' className='w-[200px]' />
        </div>
      )}
    </div>
  );
};
