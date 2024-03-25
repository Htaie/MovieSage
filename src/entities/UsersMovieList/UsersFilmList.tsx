import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userRatingStore, userPlanListStore, deleteUserRating } from '../../features/MovieDetails/RatingStar';
import { useStore } from 'effector-react';
import { RatingRounding } from '../../shared/utils/textUtils';
import { ModalDataType } from '../../shared/types/ModalDataTypes';
import MovieModal from '../../shared/UI/modal/MovieModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const UsersFilmsList = ({ formType }: { formType: string }) => {
  const data = formType === 'ratedlist' ? useStore(userRatingStore) : useStore(userPlanListStore);
  const [modalData, setModalData] = useState({} as ModalDataType);
  const [isHovered, setIsHovered] = useState(false);
  const [currentLink, setCurrentLink] = useState(null as number | null);
  const [linkPosition, setLinkPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (film: ModalDataType, event) => {
    const { id, image, title, clickedRating, type, year, shortDescription, rating, genres } = film;
    if (rating !== null) {
      const roundedRating = RatingRounding(rating);
      setModalData({ id, image, title, rating: roundedRating, clickedRating, type, year, shortDescription, genres });
    } else {
      setModalData({ id, image, title, rating, clickedRating, type, year, shortDescription, genres });
    }
    setIsHovered(true);
    setLinkPosition({ x: event.clientX, y: event.clientY });
    setCurrentLink(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentLink(null);
  };

  const handleDeleteFilm = (filmId: number) => {
    deleteUserRating(filmId);
  };

  return (
    <div className='text-white border-2 border-solid border-[#5138E9] rounded-lg h-[100%] w-[80%] pb-[400px] mx-auto mt-[30px]'>
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
              <DeleteForeverIcon
                onClick={() => handleDeleteFilm(Number(filmId))}
                className='text-3xl ml-4 cursor-pointer hover:text-red-500'
              ></DeleteForeverIcon>
            </div>
          </div>
        );
      })}
      <MovieModal
        modalData={modalData}
        isHovered={isHovered}
        linkPosition={linkPosition}
        setIsHovered={setIsHovered}
        currentLink={currentLink}
      />
    </div>
  );
};
