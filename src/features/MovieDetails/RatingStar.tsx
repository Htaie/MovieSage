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
    id: number;
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

userRatingStore.on(deleteFromRatedList, (state, id) => {
  const newState = { ...state };
  delete newState[id];
  return newState;
});

userPlanListStore.on(deleteFromPlannedList, (state, id) => {
  const newState = { ...state };
  delete newState[id];
  return newState;
});

export const RaitingInfo = ({ data }: RaitingInfoProps): JSX.Element => {
  const userData = useStore(userDataStore);
  const dataUserId = userData.user.id;
  const [userRating, setUserRating] = useState<number | null>(null);
  const [plannedList, setPlannedList] = useState<any[]>([]);

  const stars = Array.from({ length: 10 }, (_, index) => (
    <StarOutlinedIcon key={index} style={{ fontSize: '3em', color: '#a0a0a0' }} />
  ));

  const ratingScore = RatingRounding(data.rating.kp, 1);

  const handleStarClick = (clickedRating: number) => {
    setUserRating(clickedRating);
    const { id, name, year, poster, type } = data;
    const RatedData = {
      ...userRatingStore.getState(),
      [id]: {
        id: id,
        clickedRating,
        title: name,
        year,
        image: poster.url,
        type,
        rating: data.rating.kp,
        shortDescription: data.shortDescription,
        genres: data.genres,
      },
    };
    userRatingStore.setState(RatedData);
  };

  const handleAddToPlanList = async () => {
    const { id, name, genres, type, year, poster, shortDescription, rating } = data;

    const userId = dataUserId;
    const uniqueId = uuidv4();

    const { data: addedMovie, error } = await supabase.from('planned_list').insert([
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
        clicked_rating: 0,
        movie_unique_id: uniqueId,
      },
    ]);

    const plannedListData = await fetchPlannedList();
    console.log('Fetched planned list data:', plannedListData);

    if (error) {
      console.error('Error adding movie to planned_list:', error);
      return;
    }
    if (addedMovie) {
      console.log('Added movie', addedMovie);
    }
  };

  const fetchPlannedList = async () => {
    const { data: dataList, error } = await supabase.from('planned_list').select('*').eq('id', dataUserId);

    if (error) {
      console.error('Error fetching planned list:', error);
      return null;
    }

    return dataList;
  };

  useEffect(() => {
    const fetchPlannedListData = async () => {
      const dataList = await fetchPlannedList();
      if (dataList) {
        setPlannedList(dataList);
      }
    };

    fetchPlannedListData();
  }, [userData.user.id]);

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
          <div className='flex justify-between'>
            <p className='font-bold text-5xl'>{ratingScore}</p>
            {userRating ? (
              <div className='flex'>
                <p className='font-bold text-4xl mr-[20px]'>Ваша оценка:</p>
                <span className='font-bold text-5xl'>{userRating}</span>
              </div>
            ) : null}
            <MainBtn
              text={'Добавить в запланированные'}
              onClick={() => {
                handleAddToPlanList();
              }}
              style={{ marginBottom: '20px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
