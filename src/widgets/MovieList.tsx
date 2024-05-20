import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, TOKEN } from '../shared/constants/constants';
import MovieCard from '../features/MovieCard';
import MainLoader from '../shared/loader/MainLoader';
import { useStore } from 'effector-react';
import { searchValueStore } from '../features/Search/SearchResults';
import { MainBtn } from '../shared/UI/buttons/MainBtn';
import { FilterModal } from '../shared/UI/modal/FilterModal';
import CloseIcon from '@mui/icons-material/Close';
import { SelectedFilters } from '../shared/UI/modal/FilterModal';

const MovieList = ({ name }: { name: string }): JSX.Element => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchValue = useStore(searchValueStore);

  const [filterModal, setFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    genres: {},
    mpaa: {},
    countries: {},
    year: {},
    rating: {},
  });
  const applyFilters = (filters: SelectedFilters) => {
    setSelectedFilters(filters);
    setPageNumber(1);
    setData([]);
  };

  const validTypes = ['anime', 'movie', 'tv-series'];
  const typeList = validTypes.includes(name);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);

        let url = `${API_URL}movie?page=${pageNumber}&limit=50&notNullFields=poster.url`;

        if (searchValue) {
          url += `&query=${searchValue}`;
        } else if (typeList) {
          url = `${API_URL}movie?page=${pageNumber}&limit=10&type=${name}&notNullFields=poster.url`;
        } else {
          url += `&genres.name=${name}`;
        }

        if (Object.keys(selectedFilters.genres).length > 0) {
          const genres = Object.keys(selectedFilters.genres)
            .filter((key) => selectedFilters.genres[key])
            .join(',');
          url += `&genres.name=${encodeURIComponent(genres)}`;
        }

        if (Object.keys(selectedFilters.mpaa).length > 0) {
          const mpaa = Object.keys(selectedFilters.mpaa)
            .filter((key) => selectedFilters.mpaa[key])
            .join(',');
          url += `&ratingMpaa=${mpaa}`;
        }

        if (Object.keys(selectedFilters.countries).length > 0) {
          const countries = Object.keys(selectedFilters.countries)
            .filter((key) => selectedFilters.countries[key])
            .join(',');
          url += `&countries.name=${encodeURIComponent(countries)}`;
        }

        if (Object.keys(selectedFilters.year).length > 0) {
          const years = Object.keys(selectedFilters.year)
            .filter((key) => selectedFilters.year[key])
            .join(',');
          url += `&year=${encodeURIComponent(years)}`;
        }

        if (Object.keys(selectedFilters.rating).length > 0) {
          const ratings = Object.keys(selectedFilters.rating)
            .filter((key) => selectedFilters.rating[key])
            .join(',');
          url += `&rating.imdb=${ratings}`;
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
        setData((prevData): any => [...prevData, ...responseData.docs]);
        setMaxPages(responseData.pages);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [pageNumber, name, searchValue, selectedFilters]);
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

  const handleOpenFilter = () => {
    setFilterModal(true);
  };

  return (
    <>
      <div className='flex justify-center items-center w-[95%] h-[30px] mb-4'>
        <MainBtn text='Фильтры' onClick={handleOpenFilter} />
      </div>
      {filterModal && (
        <div className='w-[90%] h-full'>
          <div
            className='bg-black opacity-75 z-40 absolute top-0 left-0 right-0 bottom-0'
            onClick={() => {
              setFilterModal(false);
            }}
          >
            <CloseIcon
              onClick={() => {
                setFilterModal(false);
              }}
              className='text-white absolute right-3 top-3 cursor-pointer'
              style={{ fontSize: '50px' }}
            />
          </div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
            <FilterModal onApplyFilters={applyFilters} onClose={() => setFilterModal(false)} />
          </div>
        </div>
      )}
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
