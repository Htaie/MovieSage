import { useParams } from 'react-router-dom';
import NavBar from '../components/navigation/NavBar';
import { apiKey, apiUrl } from '../constants';
import { useEffect, useState } from 'react';
import MovieCards from '../components/SearchFilmComponents/MoviesCards';
import Footer from '../components/footer/Footer';
import { FormatingName } from '../textUtils';

const SearchFilms = () => {
  const [data, setData] = useState([]);
  const { name } = useParams();

  console.log(name);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiUrl}movie?page=1&limit=100&genres.name=${name}`;
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
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <div className="bg-black h-full min-h-screen ">
        <h1 className="text-white text-3xl mb-10 pt-36 ml-20 ">Поиск жанру : {FormatingName(name)}</h1>
        <div className=" container mx-auto my-0 flex flex-wrap justify-between">
          <MovieCards data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchFilms;
