import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import GenresCards from '../cards/GenresCards';
import { Link } from 'react-router-dom';
import { apiKey, apiUrl } from '../../constants';

const MainSlider = () => {
  const [data, setData] = useState([]);
  interface MovieType {
    type: string;
    name: string;
    rating: {
      imdb: number;
    };
    genres: { name: string }[];
    countries: { name: string }[];
    year: number;
    shortDescription: string;
    backdrop: {
      url: string;
    };
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + 'movie?page=1&limit=20', {
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
        setData(responseData.docs);

        localStorage.setItem('movieData', JSON.stringify(responseData.docs));
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    const storedData = localStorage.getItem('movieData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchData();
    }
  }, []);
  return (
    <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {data.map((movie: MovieType) => (
        <SwiperSlide key={movie.id}>
          <div className="absolute bottom-0 ml-40 font-bold h-[400px] text-white">
            <div className="flex items-center space-x-2">
              <Link
                to={`/genres/}`}
                className="backdrop-blur-lg  bg-white/10 hover:backdrop-blur-3xl hover:bg-white/30  px-3 py-2  rounded-3xl text-xl mx-2"
              >
                {movie.type.charAt(0).toUpperCase() + movie.type.slice(1)}
              </Link>
              <p>{movie.rating.imdb} IMDB</p>
              <p>{movie.rating.kp} KINOPOISK</p>
            </div>
            <h1 className="mb-4 w-2/3 text-wrap text-4xl mx-2 mt-3">{movie.name}</h1>
            <div className="flex">
              <GenresCards data={movie.genres} />
            </div>
            <h1 className=" w-[460px] text-wrap text-xl mx-2 mt-3 mb-10">{movie.shortDescription}</h1>
            <Link to={`/movie/${movie.id}`} className=" py-4  px-7 border rounded-3xl">
              Перейти к фильму
            </Link>
          </div>
          <img className="w h-full w-full object-cover" src={movie.backdrop.url} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
