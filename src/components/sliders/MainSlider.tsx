import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import GenresCards from '../cards/GenresCards';
import { Link } from 'react-router-dom';
import { RatingRounding } from '../../textUtils';
import { TOKEN, apiUrl } from '../../constants';

const MainSlider = () => {
  const divStyle = {
    WebkitBoxShadow: '200px -300px 100px -100px rgba(0, 0, 0, 0.7) inset',
    MozBoxShadow: '200px -300px 100px -100px rgba(0, 0, 0, 0.7) inset',
    boxShadow: '200px -300px 100px -100px rgba(0, 0, 0, 0.7) inset',
  };

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
            'X-API-KEY': TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData.docs);
        console.log(responseData.docs);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();
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
      // autoplay={{
      //   delay: 2500,
      //   disableOnInteraction: false,
      // }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      className="h-[400px] bg-black"
    >
      {data.map(
        (movie: MovieType) =>
          movie.logo.url && (
            <SwiperSlide key={movie.id}>
              <div className="relative">
                {/* Задний фон */}
                <img className="w h-full w-full object-cover" src={movie.backdrop.url} alt="backdropMovie" />

                {/* Информация */}
                <div className="absolute bottom-0 left-0 ml-40 font-bold h-[500px] text-white z-10">
                  <img className="h-[120px] w-[50%] ml-2 main-slider mb-10" src={movie.logo.url} alt={movie.name} />
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/genres/}`}
                      className="backdrop-blur-lg bg-white/10 hover:backdrop-blur-3xl hover:bg-white/30 px-3 py-2 rounded-3xl text-xl mx-2"
                    >
                      {movie.type.charAt(0).toUpperCase() + movie.type.slice(1)}
                    </Link>
                    <p>{movie.rating.imdb} IMDB</p>
                    <p>{RatingRounding(movie.rating.kp)} KINOPOISK</p>
                  </div>
                  <div className="flex-wrap">
                    <GenresCards data={movie.genres} />
                  </div>
                  <h1 className="w-[460px] text-wrap text-xl mx-2 mt-3 mb-10">{movie.shortDescription}</h1>
                  <Link to={`/movie/${movie.id}`} className="py-4 px-7 border rounded-3xl">
                    Перейти к фильму
                  </Link>
                </div>

                {/* Затемнение */}
                <div className="absolute w-[700px] h-[350px] bottom-0" style={divStyle}></div>
              </div>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
};

export default MainSlider;
