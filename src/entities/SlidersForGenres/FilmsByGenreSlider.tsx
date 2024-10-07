import { useEffect, useState } from 'react';
import { TOKEN } from '../../shared/constants/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { FormatingName } from '../../shared/utils/textUtils';
import { MovieType } from '../../shared/types/MoviesTypes';
import MainLoader from '../../shared/loader/MainLoader';
import MovieCard from '../../features/MovieCard';

import { MainBtn } from '../../shared/UI/buttons/MainBtn';

export const FilmByGenreSlider = ({ genre, isMobile }: { genre: string; isMobile: boolean }): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = `
      https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=&notNullFields=poster.url&sortField=votes.imdb&sortType=1&year=2024&rating.imdb=5-10&genres.name=${genre}`;
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
console.log(data)
  return (
    <>
    <div className='flex w-full items-center justify-between'>
      <h1 className='text-3xl text-white ml-2 my-10'>{FormatingName(genre)}</h1>
      <MainBtn className='text-white rounded-3xl' to={`/genre/${genre}`} text={'Все'}/> 
    </div>
      <Swiper
        style={{
          width: '100%',
        }}
        slidesPerView={isMobile ? 2 : 6}
        spaceBetween={isMobile ? 5 : 5}
        slidesPerGroup={isMobile ? 2 : 6}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className='swiper-navigation-color '
        modules={[Navigation]}
      >
        {Array.isArray(data) ? (
          data.map((item: MovieType, index: number) => (
            <SwiperSlide style={{height: '500px'}} key={index} className='flex items-center'>
              <MovieCard
                id={item.id}
                poster={item.poster.url}
                rating={item.rating.imdb}
                name={item.name}
                seriesLength={item.seriesLength}
              />
            </SwiperSlide>
          ))
        ) : (
          <MainLoader />
        )}

      </Swiper>
    </>
  );
};
