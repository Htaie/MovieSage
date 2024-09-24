import { useEffect, useState } from 'react';
import { TOKEN } from '../../shared/constants/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { FormatingName } from '../../shared/utils/textUtils';
import { MovieType } from '../../shared/types/MoviesTypes';
import View from '../../features/View';
import MainLoader from '../../shared/loader/MainLoader';
import MovieCard from '../../features/MovieCard';

export const FilmByGenreSlider = ({ genre, isMobile }: { genre: string; isMobile: boolean }): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = `
      https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=movieLength&selectFields=poster&notNullFields=name&notNullFields=year&notNullFields=movieLength&notNullFields=poster.url&genres.name=${genre}`;
      const movieStoredData = localStorage.getItem(`movieByGenresData_${genre}`);
      try {
        if (movieStoredData) {
          setData(JSON.parse(movieStoredData));
        } else {
          const response = await fetch(url, {
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
          setData(responseData.docs);
          localStorage.setItem(`movieByGenresData_${genre}`, JSON.stringify(responseData.docs));
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    void fetchData();
  }, [genre]);

  return (
    <>
      <h1 className='text-3xl text-white ml-2 my-10'>{FormatingName(genre)}</h1>
      <Swiper
        style={{
          width: '100%',
        }}
        slidesPerView={isMobile ? 2 : 4}
        spaceBetween={isMobile ? 5 : 25}
        slidesPerGroup={isMobile ? 2 : 4}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className='swiper-navigation-color '
        modules={[Navigation]}
      >
        {Array.isArray(data) ? (
          data.map((item: MovieType, index: number) => (
            <SwiperSlide key={index} className='flex test items-center mx-2 h-[300px] md:w-[288px] md:h-[432px] '>
              <MovieCard
                id={item.id}
                poster={item.poster.url}
                rating={item.rating.imdb}
                name={item.name}
                year={item.year}
                movieLength={item.movieLength}
              />
            </SwiperSlide>
          ))
        ) : (
          <MainLoader />
        )}
        <SwiperSlide className='w-[150px] h-[300px] md:w-[288px] md:h-[432px]'>
          <View genre={genre} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
