import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { MainBtn } from '../../shared/UI/buttons/MainBtn';
import { RatingRounding } from '../../shared/utils/textUtils';
import { MovieType } from '../../shared/types/MoviesTypes';
import { useState } from 'react';
import { createStore } from 'effector';

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

export const RaitingInfo = ({ data }: RaitingInfoProps): JSX.Element => {
  const [userRating, setUserRating] = useState<number | null>(null);

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

  const handleAddToPlanList = () => {
    const { id, name, year, poster, type } = data;
    const RatedData = {
      ...userPlanListStore.getState(),
      [id]: {
        clickedRating: 0,
        title: name,
        year,
        image: poster.url,
        type,
        rating: data.rating.kp,
        shortDescription: data.shortDescription,
        genres: data.genres,
      },
    };
    userPlanListStore.setState(RatedData);
  };

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
