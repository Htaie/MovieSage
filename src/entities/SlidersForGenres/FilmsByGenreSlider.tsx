import { useEffect, useState } from 'react';
import { TOKEN } from '../../shared/constants/constants';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import MovieSlider from '../MovieSlider/MovieSlider';

export const FilmByGenreSlider = ({ genre }: { genre: string; isMobile: boolean }): JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const url = `
      https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&selectFields=&notNullFields=poster.url&sortField=votes.imdb&sortType=1&year=2024&rating.imdb=5-10&genres.name=${genre}`;
      const movieStoredData = localStorage.getItem(`movieByGenresData_${genre}`);
      const lastDataUpdate = localStorage.getItem(`lastUpdateTime_${genre}`);
      const now = new Date().getTime();
      try {
        if (movieStoredData && lastDataUpdate) {
          const storedDate = new Date(lastDataUpdate).getTime();
          const isUpdateNeeded = now - storedDate > 1000 * 60 * 60 * 24;
          if (!isUpdateNeeded) {
            setData(JSON.parse(movieStoredData));
            return;
          }
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
        setData(responseData.docs);
        localStorage.setItem(`movieByGenresData_${genre}`, JSON.stringify(responseData.docs));
        localStorage.setItem(`lastUpdateTime_${genre}`, new Date().toISOString());
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    void fetchData();
  }, [genre]);

  return (
    <>
      <MovieSlider data={data} title={genre} />
    </>
  );
};
