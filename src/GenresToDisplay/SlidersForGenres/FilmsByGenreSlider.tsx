import { useEffect, useState } from 'react';
import { TOKEN, apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

export const FilmByGenreSlider = ({ genre, type }: { genre: string; type: string }): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        let localStorageKey = '';

        if (type.length > 0) {
          localStorageKey = `movieByTypeData_${type}`;
        } else {
          localStorageKey = `movieByGenresData_${genre}`;
        }

        const movieStoredData = localStorage.getItem(localStorageKey);

        if (movieStoredData != null) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setData(JSON.parse(movieStoredData));
        } else {
          let url = '';

          if (type.length > 0) {
            url = `${apiUrl}movie?page=1&limit=15&selectFields=id&selectFields=name&selectFields=backdrop&notNullFields=backdrop.url&sortField=&sortType=1&type=${type}`;
          } else {
            url = `${apiUrl}movie?page=1&limit=32&selectFields=id&selectFields=name&selectFields=backdrop&notNullFields=backdrop.url&sortField=&sortType=1&genres.name=${genre}`;
          }

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
          localStorage.setItem(localStorageKey, JSON.stringify(responseData.docs));
          console.log(responseData);
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    void fetchData();
  }, [genre, type]);

  return (
    <>
      <h1 className='text-3xl text-white ml-12'>{genre || type}</h1>

      <Swiper
        style={
          {
            width: '100%',
            height: '300px',
          } as any
        }
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
          data.map((item: any, index: number) => (
            <SwiperSlide key={index} className='flex items-center mx-2'>
              <Link to={`/movie/${item.id}`} className='transition-transform  transform hover:scale-105'>
                <div className='relative'>
                  <img
                    src={item.backdrop.url}
                    alt='film image'
                    className='w-[370px] h-[200px] rounded-lg object-cover'
                  ></img>
                  <div className='absolute inset-0 bg-black opacity-30'></div>
                  <p className='absolute bottom-2 ml-2 text-white text-2xl'>{item.name}</p>
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
