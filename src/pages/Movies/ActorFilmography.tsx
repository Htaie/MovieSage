import { useEffect, useState } from 'react';
import { FILMOGRAPHY_TOKEN } from '../../shared/constants/constants.ts';
import MovieCard from '../../features/MovieCard.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import MainLoader from '../../shared/loader/MainLoader.tsx';

interface Film {
  alternativeName: string;
  description?: string;
  enProfession?: string;
  general: boolean;
  id: number;
  name: string;
  rating: number | null;
}

interface FilmographyMovie {
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  kinopoiskId: number;
  ratingImdb: number;
}

interface ActorFilmographyProps {
  data: Film[];
}

export const ActorFilmography = ({ data }: ActorFilmographyProps) => {
  const [filmData, setFilmData] = useState<FilmographyMovie[]>([]);
  const [slide, setSlide] = useState(0);
  const filmPerSlide = 8;

  useEffect(() => {
    const fetchInitialFilmography = async () => {
      await fetchFilms(0);
    };

    if (data && data.length > 0) {
      fetchInitialFilmography();
    }
  }, [data]);

  const fetchFilms = async (startIndex: number) => {
    const filmsToFetch = data.slice(startIndex, startIndex + filmPerSlide);

    const filmRequests = filmsToFetch.map((film) => {
      return fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-API-KEY': FILMOGRAPHY_TOKEN,
        },
      })
        .then((response) => response.json())
        .then((movieData) => movieData as FilmographyMovie);
    });

    const filmDataArray = await Promise.all(filmRequests);
    setFilmData((prevData) => [...prevData, ...filmDataArray]);
  };

  const handleReachEnd = () => {
    const nextSlideIndex = slide + filmPerSlide;
    if (nextSlideIndex < data.length) {
      setSlide(nextSlideIndex);
      fetchFilms(nextSlideIndex);
    }
  };

  return (
    <div>
      {filmData ? (
        <Swiper
          slidesPerView={7}
          loop={false}
          navigation={true}
          modules={[Navigation]}
          className='swiper-navigation-color'
          onReachEnd={handleReachEnd}
        >
          {filmData.map((item: FilmographyMovie, index: number) => (
            <SwiperSlide key={index}>
              <MovieCard
                id={item.kinopoiskId}
                poster={item.posterUrlPreview}
                name={item.nameRu}
                rating={item.ratingImdb}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <MainLoader />
      )}
    </div>
  );
};
