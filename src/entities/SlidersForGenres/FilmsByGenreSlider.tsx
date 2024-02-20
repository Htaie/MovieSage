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

export const FilmByGenreSlider = ({ genre }: { genre: string; type: string }): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = `
      https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=movieLength&selectFields=poster&notNullFields=name&notNullFields=year&notNullFields=movieLength&notNullFields=poster.url&genres.name=${genre}`;

      try {
        const movieStoredData = localStorage.getItem('movieByGenresData');
        if (movieStoredData != null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setData(responseData.docs);
          localStorage.setItem('movieByGenresData', JSON.stringify(responseData.docs));
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    void fetchData();
  }, [genre]);
  const boxShadowStyle = {
    WebkitBoxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
    MozBoxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
    boxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
  };
  return (
    <>
      <h1 className='text-3xl text-white ml-12 mb-10'>{FormatingName(genre)}</h1>

      <Swiper
        style={{
          width: '100%',
        }}
        slidesPerView={5}
        slidesPerGroup={5}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className='swiper-navigation-color'
        modules={[Navigation]}
      >
        {Array.isArray(data) ? (
          data.map((item: MovieType, index: number) => (
            <SwiperSlide key={index} className='flex items-center mx-2 '>
              <Link to={`/movie/${item.id}`}>
                <div className='relative'>
                  <img src={item.poster.url} alt='film image' className='rounded-lg object-cover'></img>
                  <div
                    className='absolute inset-0  opacity-0 transition-opacity box-shadow duration-300 hover:opacity-100 '
                    style={boxShadowStyle}
                  >
                    <span
                      className='px-3 py-2 rounded-xl text-white absolute right-2 top-2'
                      style={{ backgroundColor: RatingScore(item.rating.imdb) }}
                    >
                      {RatingRounding(item.rating.imdb)}
                    </span>
                    <div className=' text-gray-400  text-xl bottom-3 left-3 absolute'>
                      <p className='text-white'>{item.name}</p>
                      <span className='mr-2'>{item.year}</span>
                      <span>{ConvertMinutes(item.movieLength)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Swiper>
    </>
  );
};
