import { useEffect, useState } from 'react';
import { apiKey } from '../../constants';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { getEmojiForGenre } from '../../hooks/GengresSmile';

const GenresLinkCards = () => {
  const [data, setData] = useState<GenresType[] | undefined>(undefined);

  interface GenresType {
    name: string;
    slug: string;
  }

  useEffect(() => {
    const storedData = localStorage.getItem('genresData');

    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      const fetchData = async () => {
        try {
          const url = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'X-API-KEY': apiKey,
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const responseData = await response.json();
          setData(responseData);

          localStorage.setItem('genresData', JSON.stringify(responseData));
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl text-white ml-12">Жанры</h1>

      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="text-white"
      >
        {data ? (
          data.map((genre: GenresType) => (
            <SwiperSlide
              key={genre.name}
              className="backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30  py-16  px-10  rounded-2xl text-xl mx-2 my-16"
            >
              <Link to={`/genre/`} className=" text-center text-xl">
                <p className="text-[79px] mb-10">{getEmojiForGenre(genre.name)}</p>
                <h3>{genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}</h3>
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

export default GenresLinkCards;
