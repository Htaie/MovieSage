import { useEffect, useState } from 'react';
import { TOKEN, API_URL } from '../../shared/constants/constants';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { ConvertMinutes, FormatingName, RatingRounding, RatingScore } from '../../shared/utils/textUtils';
import { MovieType } from '../../shared/types/MoviesTypes';
import View from '../../features/View';
import MainLoader from '../../shared/loader/MainLoader';
import MovieCard from '../../features/MovieCard';

export const FilmByGenreSlider = ({ genre }: { genre: string }): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = `
      https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=movieLength&selectFields=poster&notNullFields=name&notNullFields=year&notNullFields=movieLength&notNullFields=poster.url&genres.name=${genre}`;

      try {
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setData(responseData.docs);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    void fetchData();
  }, [genre]);

  return (
    <>
      <h1 className='text-3xl text-white ml-12 my-10'>{FormatingName(genre)}</h1>

      <Swiper
        style={{
          width: '100%',
        }}
        slidesPerView={5}
        spaceBetween={30}
        slidesPerGroup={5}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className='swiper-navigation-color '
        modules={[Navigation]}
      >
        {Array.isArray(data) ? (
          data.map((item: MovieType, index: number) => (
            <SwiperSlide key={index} className='flex items-center mx-2 w-[288px] h-[432px] '>
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
        <SwiperSlide className='w-[288px] h-[432px]'>
          <View genre={genre} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
