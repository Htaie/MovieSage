import { useEffect, useState } from 'react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { RatingRounding } from '../../shared/utils/textUtils';
import { TOKEN, API_URL } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';
import GenreLink from '../../features/GenreLink/GenreLink';
import styles from './MainSliderStyles.module.css';
import { motion } from 'framer-motion';

const MainSlider: React.FC = () => {
  const divStyle = {
    WebkitBoxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
    MozBoxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
    boxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
  };

  const [data, setData] = useState<MovieType[]>([]);
  const [randomMovie, setRandomMovie] = useState<any>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          API_URL + 'movie?page=1&limit=10&sortField=votes.imdb&sortType=1&votes.imdb=1900000-3900000',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'X-API-KEY': TOKEN,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData.docs as MovieType[]);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    void fetchData();
  }, []);

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

  const animationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 3 } },
  };

  console.log(randomMovie);

  return (
    <>
      {randomMovie && (
        <div
          key={data.indexOf(randomMovie)}
          className='relative'
          style={{
            backgroundImage: `https://placehold.co/1540x786`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '786px',
          }}
        >
          <motion.img
            variants={animationVariants}
            initial='hidden'
            animate='visible'
            className='h-full w-full object-cover'
            src={randomMovie.backdrop.url || 'https://placehold.co/1000x500'}
            loading='lazy'
            alt='backdropMovie'
          />
          <motion.div
            variants={animationVariants}
            initial='hidden'
            animate='visible'
            className='absolute bottom-12 left-0 ml-40 font-bold text-white z-10'
          >
            {/* <img className='h-[120px] w-[50%] ml-2 main-slider' src={randomMovie.logo.url} alt={randomMovie.name} /> */}
            <div className='flex items-center space-x-2 mt-[170px] ml-2 mb-2'>
              <p>{randomMovie.rating.imdb} IMDB</p>
              <p>{RatingRounding(randomMovie.rating.kp)} KINOPOISK</p>
            </div>
            <div className='flex flex-wrap w-[70%]'>
              <GenreLink genres={randomMovie.genres} />
            </div>
            <h1 className='w-[460px] text-wrap text-xl mx-2 mt-3 mb-10'>{randomMovie.shortDescription}</h1>
            <Link to={`/movie/${randomMovie.id}`} className='py-4 px-7  text-black bg-white rounded-3xl'>
              Перейти к фильму
            </Link>
          </motion.div>
          <div
            className='absolute w-[700px] h-[450px] bottom-0 left-12 bg-black opacity-50 rounded-full'
            style={divStyle}
          ></div>
        </div>
      )}
    </>
  );
};

export default MainSlider;
