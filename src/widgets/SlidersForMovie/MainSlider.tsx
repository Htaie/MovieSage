import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { RatingRounding } from '../../shared/utils/textUtils';
import { TOKEN, API_URL } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';
// @ts-ignore
import styles from './MainSliderStyles.module.css';
import useImageResizer from '../../shared/utils/ImageResizer';

const MainSlider: React.FC = () => {

  const [data, setData] = useState<MovieType[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(API_URL + 'movie?page=1&limit=10&notNullFields=backdrop.url&releaseYears.start=2024&rating.imdb=6-10', {
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

  return (
    <Swiper
      loop={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      // slidesPerView={'auto'}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[ Autoplay]}
      className='container w-[100%] h-[400px]   mt-8  swiper-navigation-color swiper-pagination-color'
      slidesPerView={'auto'} 
      spaceBetween={20}
    >
      {data.slice(0,10).map(
        
        (movie: MovieType) =>
          movie.backdrop?.url !== null && ( 
            
            <SwiperSlide key={movie.id} style={{ width: 'auto' }}>
              <div className='relative'>
                {/* <img
                  className='h-[400px]  w-[900px] object-cover  rounded-xl'
                  src={movie.backdrop?.url || ''}
                  loading='lazy'
                  alt='backdropMovie'
                /> */}
                              <OptimizedImage src={movie.backdrop.url} />

               
                  <div
                    className={`${styles['slide-from-left']} absolute bottom-12 left-0 md:ml-5 xl:ml-20 md:font-bold text-white z-10`}
                  >
                    <div className='flex items-center space-x-2 mt-[170px] ml-2 mb-2'>
                      <p>{movie.rating.imdb} IMDB</p>
                      <p>{RatingRounding(movie.rating.kp)} KINOPOISK</p>
                    </div>
                    {/* <div className='flex flex-wrap w-[70%]'>
                      <GenreLink genres={movie.genres} />
                    </div> */}
                    <h1 className='w-[90%] md:w-[460px] text-wrap text-s lg:text-xl mx-2 mt-3 mb-3 md:mb-10'>
                      {movie.name}
                    </h1>
                    {/* <Link
                      to={`/movie/${movie.id}`}
                      className='py-2 px-3 md:py-4 md:px-7  text-black bg-white rounded-3xl'
                    >
                      Перейти к фильму
                    </Link> */}
                  </div>
                {/* <div
                  className={`absolute ${styles['description-shadow']} w-full h-full md:w-[400px] lg:w-[500px] 2xl:w-[700px] md:h-[150px] lg:h-[300px] bottom-0 md:left-12 bg-black opacity-50 md:rounded-full`}
                ></div> */}
              </div>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};
const OptimizedImage: React.FC<{ src: string }> = ({ src }) => {
  const { resizedImage, isLoading, error } = useImageResizer(src, 900, 0.7);

  return (
    <img
      className='h-[400px] w-[900px] object-cover rounded-xl'
      src={resizedImage || src}
      loading='lazy'
      alt='backdropMovie'
    />
  );
};

export default MainSlider;
