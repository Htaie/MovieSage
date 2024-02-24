import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, TOKEN } from '../shared/constants/constants';
import MovieCard from '../features/MovieCard';
import MainLoader from '../shared/loader/MainLoader';

const MovieList = ({ name }: { name: string }): JSX.Element => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);

        const url = `${API_URL}movie?page=${pageNumber}&limit=50&genres.name=${name}&notNullFields=poster.url`;
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
        setData((prevData): any => [...prevData, ...responseData.docs]);
        setMaxPages(responseData.pages);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [pageNumber, name]);
  useEffect(() => {
    const handleScroll = (): void => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        document.body.scrollTop + (document.documentElement.scrollTop !== 0 ? document.documentElement.scrollTop : 0);

      if (!loading && windowHeight + scrollTop >= documentHeight - 400 && pageNumber < maxPages) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber, name, maxPages, loading]);

  return (
    <>
      <div className='container mx-auto grid grid-cols-4 gap-2 gap-y-10'>
        {data.map((item: any, index: number) => (
          <MovieCard
            key={index}
            id={item.id}
            poster={item.poster.url}
            rating={item.rating.imdb}
            name={item.name}
            year={item.year}
            movieLength={item.movieLength}
          />
        ))}
      </div>
      <div className='flex justify-center'>{loading && pageNumber > 1 && <MainLoader />}</div>
    </>
  );
};

export default MovieList;
