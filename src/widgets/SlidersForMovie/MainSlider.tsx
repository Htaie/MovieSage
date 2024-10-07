import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { RatingRounding } from '../../shared/utils/textUtils';
import { TOKEN, API_URL } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';
import GenreLink from '../../features/GenreLink/GenreLink';
// @ts-ignore
import styles from './MainSliderStyles.module.css';

const MainSlider: React.FC = () => {
  const [data, setData] = useState<MovieType[]>([]);
  const [activeMovieId, setActiveMovieId] = useState<number | null>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(API_URL + 'movie?page=1&limit=10', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-KEY': TOKEN,
          },
        });

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
  useEffect(() => {
    if (data.length > 0) {
      setActiveMovieId(data[0]?.id);
    }
  }, [data]);

  return (
    <Swiper
      loop={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      slidesPerView={'auto'}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Autoplay]}
      className='container w-[100%] h-[700px] md:h-[400px] lg:h-[568px] xl:h-[700px] 2xl:h-[840px] bg-[#1C3334] mt-5 md:mt-20  swiper-navigation-color swiper-pagination-color md:rounded-3xl'
      onSlideChangeTransitionEnd={(swiper) => {
        // setActiveSlideIndex(swiper.realIndex);
        setActiveMovieId(data[swiper.realIndex]?.id);
      }}
    >
      {data.slice(0, 5).map(
        (movie: MovieType) =>
          movie.backdrop?.url !== null && ( //чмошники на kinopoisk.dev не приходит лого поэтому я пока поставил backdrop :(
            <SwiperSlide key={movie.id}>
              <div className='relative'>
                <img
                  className='h-[700px] md:h-full w-full object-cover'
                  src={movie.backdrop?.url || ''}
                  loading='lazy'
                  alt='backdropMovie'
                />
                {activeMovieId === movie.id && (
                  <div
                    className={`${styles['slide-from-left']} absolute bottom-12 left-0 md:ml-5 xl:ml-20 md:font-bold text-white z-10`}
                  >
                    <div className='flex items-center space-x-2 mt-[170px] ml-2 mb-2'>
                      <p>{movie.rating.imdb} IMDB</p>
                      <p>{RatingRounding(movie.rating.kp)} KINOPOISK</p>
                    </div>
                    <div className='flex flex-wrap w-[70%]'>
                      <GenreLink genres={movie.genres} />
                    </div>
                    <h1 className='w-[90%] md:w-[460px] text-wrap text-s lg:text-xl mx-2 mt-3 mb-3 md:mb-10'>
                      {movie.shortDescription}
                    </h1>
                    <Link
                      to={`/movie/${movie.id}`}
                      className='py-2 px-3 md:py-4 md:px-7  text-black bg-white rounded-3xl'
                    >
                      Перейти к фильму
                    </Link>
                  </div>
                )}
                <div
                  className={`absolute ${styles['description-shadow']} w-full h-full md:w-[400px] lg:w-[500px] 2xl:w-[700px] md:h-[150px] lg:h-[300px] bottom-0 md:left-12 bg-black opacity-50 md:rounded-full`}
                ></div>
              </div>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default MainSlider;
