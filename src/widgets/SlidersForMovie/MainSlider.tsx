import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { RatingRounding } from '../../shared/utils/textUtils';
import { TOKEN, API_URL } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';
import GenreLink from '../../features/GenreLink/GenreLink';
import styles from './MainSliderStyles.module.css';

const MainSlider: React.FC = () => {
  const divStyle = {
    WebkitBoxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
    MozBoxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
    boxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
  };

  const [data, setData] = useState<MovieType[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
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
      className=' container  w-[100%]  bg-[#1C3334] mt-20  swiper-navigation-color swiper-pagination-color rounded-3xl'
      onSlideChangeTransitionEnd={(swiper) => {
        setActiveSlideIndex(swiper.realIndex);
        setActiveMovieId(data[swiper.realIndex]?.id);
      }}
    >
      {data.slice(0, 5).map(
        (movie: MovieType) =>
          movie.backdrop.previewUrl !== null && ( //чмошники на kinopoisk.dev не приходит лого поэтому я пока поставил backdrop :(
            <SwiperSlide key={movie.id}>
              <div className='relative'>
                <img
                  className='h-full w-full object-cover'
                  src={'https://placehold.co/1000x500' || movie.backdrop.previewUrl}
                  loading='lazy'
                  alt='backdropMovie'
                />
                {activeMovieId === movie.id && (
                  <div
                    className={`${styles['slide-from-left']} absolute bottom-12 left-0 ml-40 font-bold text-white z-10`}
                  >
                    {/* <img
                    className='h-[120px] w-[50%] ml-2 main-slider'
                    src={movie.logo.url}
                    alt={movie.name}
                    style={customShadowStyle}
                  /> */}
                    <div className='flex items-center space-x-2 mt-[170px] ml-2 mb-2'>
                      <p>{movie.rating.imdb} IMDB</p>
                      <p>{RatingRounding(movie.rating.kp)} KINOPOISK</p>
                    </div>
                    <div className='flex flex-wrap w-[70%]'>
                      <GenreLink genres={movie.genres} />
                    </div>
                    <h1 className='w-[460px] text-wrap text-xl mx-2 mt-3 mb-10'>{movie.shortDescription}</h1>
                    <Link to={`/movie/${movie.id}`} className='py-4 px-7  text-black bg-white rounded-3xl'>
                      Перейти к фильму
                    </Link>
                  </div>
                )}
                <div
                  className='absolute w-[700px] h-[450px] bottom-0 left-12 bg-black opacity-50 rounded-full'
                  style={divStyle}
                ></div>
              </div>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default MainSlider;
