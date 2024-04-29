import { useStore } from 'effector-react';
import { userPlanListStore, userRatingStore } from '../../MovieDetails/RatingStar.js';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../backend/apiClient/client.js';
import { userDataStore } from '../../../shared/store/UserStore.js';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PROFILE_ROUTE, Route } from '../../../shared/constants/constants.js';
import { motion } from 'framer-motion';
import PlaceholderLoading from 'react-placeholder-loading';

export const UserMovieList = ({ formType }: { formType: string }) => {
  const data = formType === PROFILE_ROUTE.RATED ? useStore(userRatingStore) : useStore(userPlanListStore);
  const userData = useStore(userDataStore);
  const dataUserId = userData.user.id;
  const [randomMovie, setRandomMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
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
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const descVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <div className='text-white bg-[#212124] h-[300px] mt-[100px] ml-2'>
      {Object.keys(data).length === 0 ? null : loading ? (
        <>
          <p className='text-3xl text-white mb-2'>
            Ваши {formType === PROFILE_ROUTE.RATED ? 'понравившиеся' : 'запланированные'} фильмы
          </p>
          <PlaceholderLoading shape='rect' width={525} height={240} colorEnd='#45475B' colorStart='#212124' />
        </>
      ) : (
        <>
          <p className='text-3xl text-white mb-2'>
            Ваши {formType === PROFILE_ROUTE.RATED ? 'понравившиеся' : 'запланированные'} фильмы
          </p>
          <div className='flex items-center'>
            {randomMovie && (
              <Link to={`/movie/${randomMovie.movie_id}`}>
                <div
                  key={randomMovie.movie_id}
                  className='flex relative bg-[#45475B] w-[525px] h-[240px] rounded-lg mr-4'
                  style={{ overflow: 'hidden' }}
                >
                  <motion.img
                    variants={imageVariants}
                    initial='hidden'
                    animate='visible'
                    src={randomMovie.image || 'https://via.placeholder.com/180x280'}
                    alt='Movie Poster'
                    className='w-[144px] h-[210px] mt-2 ml-2 mr-2'
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div variants={titleVariants} initial='hidden' animate='visible' className='text-xl'>
                      <Link to={`/movie/${randomMovie.movie_id}`} className='font-bold mb-2'>
                        {randomMovie.title}
                      </Link>
                    </motion.div>
                    <motion.p variants={descVariants} initial='hidden' animate='visible' className='text-sm'>
                      Добавлено: {randomMovie.added_at}
                    </motion.p>
                  </div>
                </div>
              </Link>
            )}
            <Link to={formType === PROFILE_ROUTE.RATED ? Route.RATED : Route.PLAN}>
              <ArrowForwardIosIcon className='text-white' />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
