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
  const dataUserId = userData?.user?.id;
  const [randomMovie, setRandomMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!dataUserId) return;
      const endpoint = formType === PROFILE_ROUTE.RATED ? 'liked_list' : 'planned_list';

      const { data, error } = await supabase.from(endpoint).select('*').eq('id', dataUserId);

      if (error || !data) return;

      if (formType === PROFILE_ROUTE.RATED) {
        userRatingStore.setState(data);
      } else {
        userPlanListStore.setState(data);
      }

      setRandomMovie(getRandomMovie(data));
      setLoading(false);
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

  const animationVariants = {
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
                  className='flex relative bg-[#212124] hover:bg-[#313136] transition-transform duration-700 ease-in-out transform hover:scale-105 w-[525px] h-[230px] border-2 border-[#5138E9] rounded-lg mr-4'
                  style={{ overflow: 'hidden' }}
                >
                  <motion.img
                    variants={animationVariants}
                    initial='hidden'
                    animate='visible'
                    src={randomMovie.image || 'https://via.placeholder.com/180x280'}
                    alt='Movie Poster'
                    className='w-[144px] h-[210px] my-[8px] mx-3 rounded'
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <motion.div
                      variants={animationVariants}
                      initial='hidden'
                      animate='visible'
                      className='text-xl font-bold mt-[2px]'
                    >
                      <p>{randomMovie.title}</p>
                    </motion.div>
                    <motion.p variants={animationVariants} initial='hidden' animate='visible' className='text-sm mb-2'>
                      {randomMovie.short_description}
                    </motion.p>
                    <motion.p
                      variants={animationVariants}
                      initial='hidden'
                      animate='visible'
                      className='text-sm text-gray-400'
                    >
                      Добавлено: {randomMovie.added_at}
                    </motion.p>
                  </div>
                </div>
              </Link>
            )}
            <Link to={formType === PROFILE_ROUTE.RATED ? Route.RATED : Route.PLAN}>
              <ArrowForwardIosIcon className='text-white mr-2' />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
