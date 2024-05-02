import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { MainBtn } from '../../shared/UI/buttons/MainBtn';
import { RatingRounding } from '../../shared/utils/textUtils';
import { MovieType } from '../../shared/types/MoviesTypes';
import { useEffect, useState } from 'react';
import { createEvent, createStore } from 'effector';
import { supabase } from '../../../backend/apiClient/client.js';
import { userDataStore } from '../../shared/store/UserStore';
import { useStore } from 'effector-react';
import { v4 as uuidv4 } from 'uuid';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { motion } from 'framer-motion';

interface RaitingInfoProps {
  data: MovieType;
}

interface RatedData {
  [id: number]: {
    clickedRating: number;
    image: string;
    title: string;
    year: number;
    type: string;
    rating: number;
    shortDescription: string;
    genres: string[];
    movie_id: number;
  };
}

export const userRatingStore = createStore<RatedData>({});
export const userPlanListStore = createStore<RatedData>({});

export const deleteUserRating = createEvent<number>();
export const deleteFromRatedList = createEvent<number>();
export const deleteFromPlannedList = createEvent<number>();

userRatingStore.on(deleteUserRating, (state, id) => {
  const newState = { ...state };
  delete newState[id];
  return newState;
});

userPlanListStore.on(deleteUserRating, (state, id) => {
  const newState = { ...state };
  delete newState[id];
  return newState;
});

userRatingStore.on(deleteFromRatedList, (state, movieId) => {
  const newState = { ...state };
  for (const id in newState) {
    if (newState[id].movie_id === movieId) {
      delete newState[id];
      break;
    }
  }
  return newState;
});

userPlanListStore.on(deleteFromPlannedList, (state, movieId) => {
  const newState = { ...state };
  for (const id in newState) {
    if (newState[id].movie_id === movieId) {
      delete newState[id];
      break;
    }
  }
  return newState;
});

export const RaitingInfo = ({ data }: RaitingInfoProps): JSX.Element => {
  const userData = useStore(userDataStore);
  const dataUserId = userData.user.id;
  const [userRating, setUserRating] = useState<number | null>(null);
  const [plannedList, setPlannedList] = useState<any[]>([]);
  const [ratedList, setRatedList] = useState<any[]>([]);
  const userId = dataUserId;
  const uniqueId = uuidv4();
  const [isIconRotated, setIsIconRotated] = useState(false);

  const stars = Array.from({ length: 10 }, (_, index) => (
    <StarOutlinedIcon key={index} style={{ fontSize: '3em', color: '#a0a0a0' }} />
  ));

  const ratingScore = RatingRounding(data.rating.kp, 1);

  const insertMovieToList = async (listName: string, movieData: any, clickedRating: number = 0) => {
    const { id, name, genres, type, year, poster, shortDescription, rating } = movieData;
    const { data, error } = await supabase.from(listName).insert([
      {
        id: userId,
        title: name,
        genres: genres,
        movie_id: id,
        image: poster.url,
        rating: rating.kp,
        short_description: shortDescription,
        type: type,
        year: year,
        clicked_rating: clickedRating,
        movie_unique_id: uniqueId,
      },
    ]);
    if (error) {
      console.error(`Error adding movie to ${listName}:`, error);
      return;
    }
  };

  const handleStarClick = async (clickedRating: number) => {
    setUserRating(clickedRating);

    const rated = await insertMovieToList('liked_list', data, clickedRating);
    const ratedListData = await fetchRatedList();
    if (ratedListData) {
      userRatingStore.setState(ratedListData);
    }
    alert('Movie added to liked list');
  };

  const handleAddToPlanList = async () => {
    const planned = await insertMovieToList('planned_list', data);
    const plannedListData = await fetchPlannedList();

    if (plannedListData) {
      userPlanListStore.setState(plannedListData);
    }
    alert('Movie added to planned list');
  };

  const fetchUserList = async (listName: string) => {
    const { data: dataList, error } = await supabase.from(listName).select('*').eq('id', dataUserId);

    if (error) {
      console.error(`Error fetching ${listName}:`, error);
      return null;
    }

    return dataList;
  };

  const fetchRatedList = async () => {
    return await fetchUserList('liked_list');
  };

  const fetchPlannedList = async () => {
    return await fetchUserList('planned_list');
  };

  const useFetchListEffect = (fetchFunction: () => Promise<any>, store: any, setFunction: React.Dispatch<any>) => {
    useEffect(() => {
      const fetchData = async () => {
        const dataList = await fetchFunction();
        if (dataList) {
          setFunction(dataList);
        }
      };

      const unsubscribe = store.watch(() => {
        fetchData();
      });

      fetchData();

      return () => {
        unsubscribe();
      };
    }, []);
  };

  useFetchListEffect(fetchRatedList, userRatingStore, setRatedList);
  useFetchListEffect(fetchPlannedList, userPlanListStore, setPlannedList);

  return (
    <>
      <div className='mt-[60px] mb-[180px]'>
        <p className='font-bold text-4xl mb-[70px]'>Рейтинг фильма:</p>
        <div className='grid grid-cols-[1fr,2fr]'>
          <div className='flex flex-row items-center'>
            {stars.map((_, index) => {
              const rating = index + 1;
              const starColor = rating <= ratingScore ? '#ffffff' : '#a0a0a0';

              return (
                <div key={index} className='flex flex-col items-center'>
                  <StarOutlinedIcon
                    style={{ fontSize: '3em', color: starColor }}
                    className='hover:cursor-pointer hover:scale-110'
                    onClick={() => handleStarClick(rating)}
                  />
                  <span>{rating}</span>
                </div>
              );
            })}
          </div>
          <div className='flex'>
            <p className='font-bold text-5xl mr-6'>{ratingScore}</p>
            {userRating ? (
              <div className='flex items-center'>
                <p className='font-bold text-xl mr-2'>Ваша оценка:</p>
                <span className='font-bold text-xl'>{userRating}</span>
              </div>
            ) : null}
            <motion.div
              className='absolute ml-[280px] z-10'
              onClick={() => setIsIconRotated((prevState) => !prevState)}
              animate={{ rotate: isIconRotated ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <AddRoundedIcon
                style={{ fontSize: '55px' }}
                className={`${isIconRotated ? '' : 'bg-[#272724] text-[#5138E9]'} rounded-[30px] hover:cursor-pointer hover:scale-105`}
              />
            </motion.div>
            {isIconRotated && (
              <motion.div
                className='absolute bg-[#5138E9] ml-[280px] w-[340px] h-[105px] rounded-[20px]'
                initial={{ scaleY: 0, opacity: 0, y: -50 }}
                animate={{ scaleY: isIconRotated ? 1 : 0, opacity: isIconRotated ? 1 : 0, y: isIconRotated ? 0 : -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className='flex flex-col'>
                  <MainBtn
                    text={'Добавить в просмотренные'}
                    onClick={() => {
                      handleStarClick(0);
                      setIsIconRotated(false);
                    }}
                    style={{ scale: '0.7' }}
                  />
                  <MainBtn
                    text={'Добавить в запланированные'}
                    onClick={() => {
                      handleAddToPlanList();
                      setIsIconRotated(false);
                    }}
                    style={{ scale: '0.7' }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
