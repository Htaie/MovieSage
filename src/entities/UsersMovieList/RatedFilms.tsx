import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRatingStore } from '../../features/MovieDetails/RatingStar';
import { useStore } from 'effector-react';
import { RatingRounding } from '../../shared/utils/textUtils';

interface ModalDataType {
  image: string | null;
  title: string | null;
  rating: number | null;
  shortDescription: string | null;
  type: string | null;
  year: number | null;
  clickedRating: number | null;
  genres: string[] | null;
}

export const RatedFilms = () => {
  const data = useStore(userRatingStore);
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
      {isHovered && modalData.image && (
        <div
          className='absolute bg-[#45475B] w-[510px] h-[300px]'
          style={{ top: linkPosition.y - 10, left: linkPosition.x + 40, ...shadowStyle }}
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
      )}
    </div>
  );
};

//Модальное окно получилось очень большое поэтому если нужно будет то перенесу его тоже в отдельный компонент ну пока так,просто надо было ещё данные достать для него и типы все такое
