import { useStore } from 'effector-react';
import { userPlanListStore, userRatingStore } from '../../MovieDetails/RatingStar.js';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../backend/apiClient/client.js';
import { userDataStore } from '../../../shared/store/UserStore.js';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PROFILE_ROUTE, Route } from '../../../shared/constants/constants.js';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { motion } from 'framer-motion';

export const UserMovieList = ({ formType }: { formType: string }) => {
  const data = formType === PROFILE_ROUTE.RATED ? useStore(userRatingStore) : useStore(userPlanListStore);
  const userData = useStore(userDataStore);
  const dataUserId = userData.user.id;
  const [randomMovie, setRandomMovie] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = formType === PROFILE_ROUTE.RATED ? 'liked_list' : 'planned_list';

      const { data, error } = await supabase.from(endpoint).select('*').eq('id', dataUserId);

      if (error) {
        console.error('Error fetching movie lists:', error);
        return;
      }

      if (data) {
        if (formType === PROFILE_ROUTE.RATED) {
          userRatingStore.setState(data);
        } else {
          userPlanListStore.setState(data);
        }

        setRandomMovie(getRandomMovie(data));
      }
    };

    fetchData();
  }, [dataUserId, formType]);

  const getRandomMovie = (movies: any) => {
    const keys = Object.keys(movies);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return movies[randomKey];
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomMovie(getRandomMovie(data));
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const movieVariants = {
    initial: { opacity: 0, scale: 1 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <div className='text-white bg-[#212124] h-[300px] mt-[100px] ml-2'>
      {!data || Object.keys(data).length === 0 ? (
        <div className='flex items-center mb-2'>
          <div className='flex-1 flex flex-col items-center'>
            <SentimentDissatisfiedIcon style={{ fontSize: 140 }} />
            <p className='text-sm ml-2'>
              Брадочек,у тебя нет фильмов в списке{' '}
              {formType === PROFILE_ROUTE.RATED ? 'понравившихся' : 'запланированных'}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className='text-3xl text-white mb-2'>
            Ваши {formType === PROFILE_ROUTE.RATED ? 'понравившиеся' : 'запланированные'} фильмы
          </p>
          <div className='flex items-center'>
            {randomMovie && (
              <Link to={`/movie/${randomMovie.movie_id}`}>
                <div key={randomMovie.movie_id} className='relative bg-[#45475B] w-[525px] h-[240px] rounded-lg mr-4'>
                  <motion.div
                    variants={movieVariants}
                    initial='initial'
                    animate='animate'
                    transition={{ duration: 1 }}
                    className='flex flex-row'
                  >
                    <img
                      src={randomMovie.image || 'https://via.placeholder.com/180x280'}
                      alt='Movie Poster'
                      className='w-[144px] h-[210px] mt-2 ml-2 mr-2'
                    />
                    <div className='text-xl'>
                      <Link to={`/movie/${randomMovie.movie_id}`} className='font-bold mb-2'>
                        {randomMovie.title}
                      </Link>
                      <p className='text-sm'>Добавлено: {randomMovie.added_at}</p>
                    </div>
                  </motion.div>
                </div>
              </Link>
            )}
            <Link to={formType === PROFILE_ROUTE.RATED ? Route.RATED : Route.PLAN}>
              <ArrowForwardIosIcon className='text-white' />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
