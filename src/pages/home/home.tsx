import { useEffect, useState } from 'react';
import MainSlider from '../../widgets/SlidersForMovie/MainSlider';
import { FilmByGenreSlider } from '../../entities/SlidersForGenres/FilmsByGenreSlider';
import { GENRES, MOVIE_GENRES_API_URL, TOKEN } from '../../shared/constants/constants';
import { MovieType } from '../../shared/types/MoviesTypes';
import GenreLinkSlider from '../../features/GenreCarousel/GenreLinkSlider';
import GenreBlock from '../../widgets/GenreBlock';

export const Home = (): JSX.Element => {
  const [data, setData] = useState<MovieType[]>([]);
  useEffect(() => {
    const allGenresStoredData = localStorage.getItem('allGenresData');

    if (allGenresStoredData != null) {
      setData(JSON.parse(allGenresStoredData) as MovieType[]);
    } else {
      const fetchData = async (): Promise<void> => {
        try {
          const response = await fetch(MOVIE_GENRES_API_URL, {
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
          setData(responseData as MovieType[]);
          localStorage.setItem('allGenresData', JSON.stringify(responseData));
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      void fetchData();
    }
  }, []);

  return (
    <div className='h-full bg-black'>
      <MainSlider />
      <GenreBlock />
    </div>
  );
};
