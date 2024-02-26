import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { FormatingName, RatingRounding } from '../../shared/utils/textUtils';
import { TOKEN, API_URL } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';
import GenreLink from '../../features/GenreLink/GenreLink';

const MainSlider: React.FC = () => {
  const divStyle = {
    WebkitBoxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
    MozBoxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
    boxShadow: '0px 0px 70px 120px rgba(0, 0, 0, 1)',
  };

  const customShadowStyle = {
    filter: 'drop-shadow(20px 20px 6px rgba(0, 0, 0, 0.7))',
  };

  const [data, setData] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(API_URL + 'movie?page=1&limit=20', {
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
        console.log(responseData.docs);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    void fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const swiperElement = document.querySelector('.swiper');
      const nextArrow = swiperElement?.querySelector('.swiper-button-next');
      const prevArrow = swiperElement?.querySelector('.swiper-button-prev');
      const rect = swiperElement?.getBoundingClientRect();
      const mouseX = e.clientX - (rect?.left ?? 0);

      if (
        swiperElement !== null &&
        nextArrow !== null &&
        prevArrow !== undefined &&
        prevArrow !== null &&
        nextArrow !== undefined &&
        rect !== undefined
      ) {
        if (mouseX < (rect.width ?? 0) / 2) {
          nextArrow.classList?.remove('show');
          prevArrow.classList?.add('show');
        } else {
          nextArrow.classList?.add('show');
          prevArrow.classList?.remove('show');
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className='h-full bg-[#1C3334] swiper-navigation-color swiper-pagination-color'
    >
      {data.map(
        (movie: MovieType) =>
          movie.logo.url !== null && (
            <SwiperSlide key={movie.id}>
              <div className='relative'>
                <img className='w h-full w-full object-cover' src={movie.backdrop.url} alt='backdropMovie' />

                <div className='absolute bottom-12 left-0 ml-40 font-bold h-[700px] text-white z-10'>
                  <img
                    className='h-[120px] w-[50%] ml-2 main-slider'
                    src={movie.logo.url}
                    alt={movie.name}
                    style={customShadowStyle}
                  />
                  <div className='flex items-center space-x-2 mt-[170px] ml-2 mb-2'>
                    <p>{movie.rating.imdb} IMDB</p>
                    <p>{RatingRounding(movie.rating.kp)} KINOPOISK</p>
                  </div>
                  <div className='flex flex-wrap w-[70%]'>
                    <GenreLink genres={movie.genres} />
                  </div>
                  <h1 className='w-[460px] text-wrap text-xl mx-2 mt-3 mb-10'>{movie.shortDescription}</h1>
                  <Link to={`/movie/${movie.id}`} className='py-4 px-7 border rounded-3xl'>
                    Перейти к фильму
                  </Link>
                </div>

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
