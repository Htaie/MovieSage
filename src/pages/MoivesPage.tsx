import { useParams } from 'react-router-dom';
import NavBar from '../components/navigation/NavBar';
import { apiKey, apiUrl } from '../constants';
import { useEffect, useState } from 'react';
import MovieCards from '../components/SearchFilmComponents/MoviesCards';
import Footer from '../components/footer/Footer';
import { FormatingName } from '../textUtils';
import { CircularProgress } from '@mui/material';

// ... (import statements)

const SearchFilms = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1); // Add state for maximum pages
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiUrl}movie?page=${pageNumber}&limit=195&genres.name=${name}&notNullFields=poster.url`;
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
        setData(responseData.docs);
        setMaxPages(responseData.pages);
        console.log(responseData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [pageNumber, name]);

  const handleNextPage = () => {
    if (pageNumber < maxPages) {
      setPageNumber(pageNumber + 1);
      console.log(pageNumber);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleLastPage = () => {
    if (pageNumber < maxPages) {
      setPageNumber(maxPages);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-black h-full min-h-screen ">
        <h1 className="text-white text-3xl mb-10 pt-36 ml-20 ">Поиск жанру : {FormatingName(name)}</h1>
        <div className="absolute right-0">
          <button className="text-white" onClick={handleNextPage}>
            +1
          </button>
          <button className="text-white" onClick={handlePrevPage}>
            -1
          </button>
          <button className="text-white" onClick={handleLastPage}>
            {maxPages}
          </button>
        </div>
        <div className="container mx-auto my-0 flex flex-wrap justify-between">
          <MovieCards data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchFilms;
