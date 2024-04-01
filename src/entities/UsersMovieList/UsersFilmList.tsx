import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  userRatingStore,
  userPlanListStore,
  deleteUserRating,
  deleteFromRatedList,
  deleteFromPlannedList,
} from '../../features/MovieDetails/RatingStar';
import { useStore } from 'effector-react';
import { RatingRounding } from '../../shared/utils/textUtils';
import { ModalDataType } from '../../shared/types/ModalDataTypes';
import MovieModal from '../../shared/UI/modal/MovieModal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { LISTS } from '../../shared/constants/constants';
import { userDataStore } from '../../shared/store/UserStore';

export const UsersFilmsList = ({ formType }: { formType: string }) => {
  const data = formType === LISTS.RATED ? useStore(userRatingStore) : useStore(userPlanListStore);
  const [modalData, setModalData] = useState({} as ModalDataType);
  const [isHovered, setIsHovered] = useState(false);
  const [currentLink, setCurrentLink] = useState(null as number | null);
  const [linkPosition, setLinkPosition] = useState({ x: 0, y: 0 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [likedList, setLikedList] = useState([]);

  const handleMouseEnter = (film: ModalDataType, event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const { id, image, title, clickedRating, type, year, shortDescription, rating, genres } = film;
    if (rating === null) {
      setModalData({ id, image, title, rating, clickedRating, type, year, shortDescription, genres });
    }
    if (rating !== null) {
      const roundedRating = RatingRounding(rating);
      setModalData({ id, image, title, rating: roundedRating, clickedRating, type, year, shortDescription, genres });
    }
    setSelectedRating(film.clickedRating || 0);
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
    setSelectedRating(0);
  };

  const handleRatingChange = (filmId: number, rating: number) => {
    setSelectedRating(rating);
    userRatingStore.setState({
      ...userRatingStore.getState(),
      [filmId]: { ...userRatingStore.getState()[filmId], clickedRating: rating },
    });
  };

  const handleAddToPlanList = (filmData: ModalDataType) => {
    const { id, title, year, image, type, rating, shortDescription, genres } = filmData;
    userPlanListStore.setState({
      ...userPlanListStore.getState(),
      [String(id)]: {
        clickedRating: 0,
        id,
        title,
        year,
        image,
        type,
        rating,
        shortDescription,
        genres,
      },
    });
    deleteFromRatedList(Number(id));
  };

  const handleAddToRatedList = (filmData: ModalDataType) => {
    const { id, title, year, image, type, rating, shortDescription, genres } = filmData;
    userRatingStore.setState({
      ...userRatingStore.getState(),
      [String(id)]: {
        clickedRating: 0,
        id,
        title,
        year,
        image,
        type,
        rating,
        shortDescription,
        genres,
      },
    });
    deleteFromPlannedList(Number(id));
  };

  return (
    <div className='text-white border-2 border-solid border-[#5138E9] rounded-lg h-[100%] w-[80%] pb-[400px] mx-auto mt-[30px]'>
      {Object.keys(data).length === 0 ? (
        <div className='flex items-center mb-2'>
          <div className='flex-1 flex flex-col items-center'>
            <SentimentDissatisfiedIcon style={{ fontSize: 200 }} />
            <p className='text-xl ml-2'>Брадочек,у тебя нет фильмов</p>
          </div>
        </div>
      ) : (
        Object.keys(data).map((filmId) => {
          const film = data[filmId];
          return (
            <div key={filmId} className='flex bg-[#45475B] h-[50px] items-center mb-2'>
              <div className='flex-1 flex ml-4'>
                <Link
                  to={`/movie/${filmId}`}
                  className='text-xl mr-4'
                  onMouseEnter={(event) =>
                    handleMouseEnter(film, event as unknown as MouseEvent<HTMLAnchorElement, MouseEvent>)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  {film.title}
                </Link>
                <p className='text-xl'>{film.year}</p>
              </div>
              <div className='flex-1 flex justify-end items-center mr-4'>
                <EditIcon />
                <select
                  className='text-xl bg-[#45475B] appearance-none pl-[10px] w-[40px] py-2 mr-2 focus:outline-none'
                  value={film.clickedRating}
                  onChange={(event) => handleRatingChange(film.id, parseInt(event.target.value))}
                >
                  {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <p className='text-xl'>{film.type}</p>
                <DeleteForeverIcon
                  onClick={() => handleDeleteFilm(Number(filmId))}
                  className='text-3xl ml-4 cursor-pointer hover:text-red-500'
                ></DeleteForeverIcon>
              </div>
            </div>
          );
        })
      )}
      <MovieModal
        modalData={modalData}
        isHovered={isHovered}
        linkPosition={linkPosition}
        setIsHovered={setIsHovered}
        currentLink={currentLink}
        formType={formType}
        addToPlanList={() => handleAddToPlanList(modalData)}
        addToRatedList={() => handleAddToRatedList(modalData)}
      />
    </div>
  );
};
