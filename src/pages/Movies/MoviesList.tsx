import { useParams } from 'react-router-dom';
import { API_URL, TOKEN } from '../../shared/constants/constants';
import { useEffect, useState } from 'react';
import { FormatingName } from '../../shared/utils/textUtils';
import MainLoader from '../../shared/loader/MainLoader';
import MovieCard from '../../features/MovieCard';

const MoviesList = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const { name } = useParams();
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
      <div className='bg-black h-full min-h-screen '>
        <h1 className='text-white text-3xl mb-10 pt-36 ml-20 '>{FormatingName(name)}</h1>
        <div className='absolute right-0'></div>
        <div className='container mx-auto space-y-6 flex flex-wrap justify-between'>
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
      </div>
    </>
  );
};

export default MoviesList;
