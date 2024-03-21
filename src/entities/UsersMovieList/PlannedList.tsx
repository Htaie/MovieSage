import { useStore } from 'effector-react';
import { userPlanListStore } from '../../features/MovieDetails/RatingStar';
import { RatingRounding } from '../../shared/utils/textUtils';
import { useState } from 'react';
import { ModalDataType } from '../../shared/types/ModalDataTypes';
import MovieModal from '../../shared/UI/modal/MovieModal';
import { Link } from 'react-router-dom';

export const PlannedList = () => {
  const data = useStore(userPlanListStore);
  const [modalData, setModalData] = useState({} as ModalDataType);
  const [isHovered, setIsHovered] = useState(false);
  const [linkPosition, setLinkPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (film: ModalDataType, event) => {
    const { image, title, clickedRating, type, year, shortDescription, rating, genres } = film;
    if (rating !== null) {
      const roundedRating = RatingRounding(rating);
      setModalData({ image, title, rating: roundedRating, clickedRating, type, year, shortDescription, genres });
    } else {
      setModalData({ image, title, rating, clickedRating, type, year, shortDescription, genres });
    }
    setIsHovered(true);
    setLinkPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setModalData({
      image: null,
      title: null,
      rating: null,
      shortDescription: null,
      type: null,
      year: null,
      clickedRating: null,
      genres: null,
    });
    setIsHovered(false);
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
                onMouseEnter={(event) => handleMouseEnter(film, event)}
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
      <MovieModal modalData={modalData} isHovered={isHovered} linkPosition={linkPosition} />
    </div>
  );
};
