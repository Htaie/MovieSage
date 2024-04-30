import { MouseEvent, useState, useEffect } from 'react';
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
import { PROFILE_ROUTE } from '../../shared/constants/constants';
import { userDataStore } from '../../shared/store/UserStore';
import { supabase } from '../../../backend/apiClient/client.js';
import { CustomPagination } from '../../features/Pagination/CustomPagination.js';

export const UsersFilmsList = ({ formType }: { formType: string }) => {
  const data = formType === PROFILE_ROUTE.RATED ? useStore(userRatingStore) : useStore(userPlanListStore);
  const userData = useStore(userDataStore);
  const dataUserId = userData.user.id;
  const [modalData, setModalData] = useState({} as ModalDataType);
  const [isHovered, setIsHovered] = useState(false);
  const [currentLink, setCurrentLink] = useState(null as number | null);
  const [linkPosition, setLinkPosition] = useState({ x: 0, y: 0 });
  const [selectedRating, setSelectedRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleMouseEnter = (
    {
      id,
      image,
      title,
      clicked_rating,
      type,
      year,
      short_description,
      rating,
      genres,
      movie_id,
      movie_unique_id,
    }: ModalDataType,
    event: MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const roundedRating = rating !== null ? RatingRounding(rating) : null;

    setModalData({
      id,
      image,
      title,
      rating: roundedRating,
      clicked_rating,
      type,
      year,
      short_description,
      genres,
      movie_id,
      movie_unique_id,
    });

    setSelectedRating(clicked_rating || 0);
    setIsHovered(true);
    setLinkPosition({ x: event.clientX, y: event.clientY });
    setCurrentLink(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentLink(null);
  };

  const handleDeleteFilm = async (movieId: number, movieIndex: number) => {
    let table = '';
    if (formType === PROFILE_ROUTE.RATED) {
      table = 'liked_list';
    } else {
      table = 'planned_list';
    }
    const { error } = await supabase.from(table).delete().eq('movie_id', movieId).eq('id', dataUserId);

    if (error) {
      console.error('Error deleting film from Supabase:', error);
      return;
    }

    deleteUserRating(movieIndex);
    setSelectedRating(0);
  };

  const handleRatingChange = async (movieId: number, rating: number, movieIndex: number) => {
    setSelectedRating(rating);

    try {
      const { error } = await supabase
        .from('liked_list')
        .update({ clicked_rating: rating })
        .eq('movie_id', movieId)
        .eq('id', dataUserId);

      if (error) {
        console.error('Error updating film rating in Supabase:', error);
        return;
      }

      const currentFilmRating = userRatingStore.getState()[movieIndex];
      if (currentFilmRating) {
        userRatingStore.setState({
          ...userRatingStore.getState(),
          [movieIndex]: { ...currentFilmRating, clicked_rating: rating },
        });
      }
    } catch (error) {
      console.error('Error updating film rating:', error);
    }
  };

  const handleListChange = async (filmData: ModalDataType, sourceList: string, targetList: string) => {
    const { movie_id } = filmData;

    try {
      const deleteResult = await supabase.from(sourceList).delete().eq('movie_id', movie_id).eq('id', dataUserId);

      if (deleteResult.error) {
        console.error(`Error deleting from ${sourceList}:`, deleteResult.error);
        return;
      }

      const addResult = await supabase.from(targetList).insert({
        ...filmData,
      });

      if (addResult.error) {
        console.error(`Error adding to ${targetList}:`, addResult.error);
        return;
      }

      if (sourceList === 'liked_list') {
        deleteFromRatedList(Number(movie_id));
      } else {
        deleteFromPlannedList(Number(movie_id));
      }
    } catch (error) {
      console.error('Error updating lists:', error);
    }
  };

  const handleAddToPlanList = (filmData: ModalDataType) => {
    handleListChange(filmData, 'liked_list', 'planned_list');
  };

  const handleAddToRatedList = (filmData: ModalDataType) => {
    handleListChange(filmData, 'planned_list', 'liked_list');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '';

        if (formType === PROFILE_ROUTE.RATED) {
          endpoint = 'liked_list';
        } else {
          endpoint = 'planned_list';
        }

        const { data, error } = await supabase.from(endpoint).select('*').eq('id', dataUserId);

        if (error) {
          console.error(`Error fetching ${formType} list:`, error);
          return;
        }

        if (data) {
          if (formType === PROFILE_ROUTE.RATED) {
            userRatingStore.setState(data);
          } else {
            userPlanListStore.setState(data);
          }
        }
      } catch (error) {
        console.error(`Error fetching ${formType} list:`, error);
      }
    };

    fetchData();
  }, [formType, dataUserId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Object.keys(data).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(Object.keys(data).length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='flex flex-col'>
      <div className='text-white border-2 border-solid border-[#5138E9] rounded-lg h-[582px] w-[80%] pb-[400px] mx-auto mt-[30px] mb-[30px]'>
        {Object.keys(data).length === 0 ? (
          <div className='flex items-center mb-2'>
            <div className='flex-1 flex flex-col items-center'>
              <SentimentDissatisfiedIcon style={{ fontSize: 200 }} />
              <p className='text-xl ml-2'>Брадочек,у тебя нет фильмов</p>
            </div>
          </div>
        ) : (
          currentItems.map((movie_id, index) => {
            const film = data[movie_id];
            return (
              <div key={movie_id} className='flex bg-[#45475B] h-[50px] items-center my-[7px] mx-[7px]'>
                <div className='flex-1 flex ml-4'>
                  <Link
                    to={`/movie/${film.movie_id}`}
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
                    value={film.clicked_rating}
                    onChange={(event) => handleRatingChange(film.movie_id, parseInt(event.target.value), index)}
                  >
                    {[...Array(10)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <p className='text-xl'>{film.type}</p>
                  <DeleteForeverIcon
                    onClick={() => {
                      handleDeleteFilm(film.movie_id, index);
                    }}
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
      <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};
