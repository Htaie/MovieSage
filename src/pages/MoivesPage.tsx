import { useParams } from 'react-router-dom';
import NavBar from '../components/navigation/NavBar';
import { apiKey, apiUrl } from '../constants';
import { useEffect, useState } from 'react';
import MovieCards from '../components/SearchFilmComponents/MoviesCards';
import Footer from '../components/footer/Footer';
import { FormatingName } from '../textUtils';

const SearchFilms = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const { name } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const url = `${apiUrl}movie?page=${pageNumber}&limit=50&genres.name=${name}&notNullFields=poster.url`;
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
        setData((prevData) => [...prevData, ...responseData.docs]);
        setMaxPages(responseData.pages);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber, name]);
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.scrollY || window.scrollY || document.body.scrollTop + (document.documentElement.scrollTop || 0);

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
      <NavBar />
      <div className="bg-black h-full min-h-screen ">
        <h1 className="text-white text-3xl mb-10 pt-36 ml-20 ">Поиск жанру : {FormatingName(name)}</h1>
        <div className="absolute right-0"></div>
        <div className="container mx-auto my-0 flex flex-wrap justify-between">
          <MovieCards data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchFilms;
