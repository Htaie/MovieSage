import { useEffect, useState } from 'react';
import MainSlider from '../../widgets/SlidersForMovie/MainSlider';
import GenresLinkCards from '../../widgets/GenresToDisplay/GenresCards/GenresLinkCards';
import { FilmByGenreSlider } from '../../widgets/GenresToDisplay/SlidersForGenres/FilmsByGenreSlider';
import { TOKEN } from '../../app/api/constants';
import { MovieType } from '../../app/types/MoviesTypes';

export const SecondPage = (): JSX.Element => {
  const [data, setData] = useState<MovieType[]>([]);
  useEffect(() => {
    const allGenresStoredData = localStorage.getItem('allGenresData');

    if (allGenresStoredData != null) {
      setData(JSON.parse(allGenresStoredData) as MovieType[]);
    } else {
      const fetchData = async (): Promise<void> => {
        try {
          const response = await fetch(
            'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'X-API-KEY': TOKEN,
              },
            }
          );

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
      <GenresLinkCards></GenresLinkCards>
      {data.map((genre, index) => (
        <FilmByGenreSlider key={index} genre={genre.name} slug={genre.slug} type={''} />
      ))}
    </div>
  );
};
