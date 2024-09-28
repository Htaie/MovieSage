import { useEffect, useState } from 'react';
import { API_URL, COUNTRIES_LIST, GENRES, MPAA, TOKEN, YEARS } from '../shared/constants/constants';
import MovieCard from '../features/MovieCard';
import MainLoader from '../shared/loader/MainLoader';
import { MovieType } from '../shared/types/MoviesTypes';
import { useMobile } from '../shared/hooks/useMobile';
import { FilterMapping } from '../shared/components/FilterMapping/FilterMapping';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface SelectedFilters {
  genres: { [key: string]: boolean };
  mpaa: { [key: string]: boolean };
  countries: { [key: string]: boolean };
  year: { [key: string]: boolean };
  rating: { [key: string]: boolean };
}

const appendFilterToUrl = (
  url: string,
  selectedFilter: { [key: string]: boolean },
  paramName: string,
  shouldEncode: boolean = true,
  ratingImdb: boolean
): string => {
  const activeFilters = Object.keys(selectedFilter)
    .filter((key) => selectedFilter[key])
    .join(',');

  if (activeFilters.length > 0) {
    const encodedFilters = shouldEncode ? encodeURIComponent(activeFilters) : activeFilters;
    return `${url}&${paramName}=${ratingImdb ? encodedFilters + '-10' : encodedFilters}`;
  }

  return url;
};

const MovieList = ({ name }: { name: string }): JSX.Element => {
  const [data, setData] = useState<MovieType[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    genres: {},
    mpaa: {},
    countries: {},
    year: {},
    rating: {},
  });
  const [sliderValue, setSliderValue] = useState(5);
  const isMobile = useMobile();

  const handleFilterChange = (filterType: keyof SelectedFilters, filterValue: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterType]: {
        ...prevState[filterType],
        [filterValue]: !prevState[filterType][filterValue],
      },
    }));
  };

  const handleSliderChange = (newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
      setSelectedFilters((prevState) => ({
        ...prevState,
        rating: {
          [newValue]: true,
        },
      }));
    }
  };

  const validTypes = ['anime', 'movie', 'tv-series'];
  const typeList = validTypes.includes(name);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const filterMappings = [
    { key: 'genres', paramName: 'genres.name', shouldEncode: true, ratingImdb: false },
    { key: 'mpaa', paramName: 'ratingMpaa', shouldEncode: false, ratingImdb: false },
    { key: 'countries', paramName: 'countries.name', shouldEncode: true, ratingImdb: false },
    { key: 'year', paramName: 'year', shouldEncode: true, ratingImdb: false },
    { key: 'rating', paramName: 'rating.imdb', shouldEncode: false, ratingImdb: true },
  ];

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);

        let url = `${API_URL}movie?page=${pageNumber}&limit=25&sortField=votes.imdb&sortType=1&votes.imdb=150000-6666666&notNullFields=poster.url`;

        if (typeList) {
          url = `${API_URL}movie?page=${pageNumber}&limit=10&sortField=votes.imdb&sortType=1&votes.imdb=${name === 'anime' ? '150000-666666' : '300000-6666666'}&type=${name}&notNullFields=poster.url`;
        } else {
          url += `&genres.name=${name}`;
        }

        filterMappings.forEach(({ key, paramName, shouldEncode, ratingImdb }) => {
          url = appendFilterToUrl(
            url,
            selectedFilters[key as keyof SelectedFilters],
            paramName,
            shouldEncode,
            ratingImdb
          );
        });

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
        if (pageNumber === 1) {
          setData(responseData.docs);
        } else {
          setData((prevData) => [...prevData, ...responseData.docs]);
        }
        setMaxPages(responseData.pages);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [pageNumber, name, selectedFilters]);

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

  const handleResetFilters = () => {
    setSelectedFilters({
      genres: {},
      mpaa: {},
      countries: {},
      year: {},
      rating: {},
    });
    setData([]);
    setSliderValue(5);
    setPageNumber(1);
  };

  return (
    <div className='container mx-auto'>
      <div className='text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-10'>
        <div className='mb-2 md:mb-0'>
          <p>Жанры:</p>
          <FilterMapping
            items={Object.values(GENRES)}
            selectedFiltersKey={selectedFilters.genres}
            handleFilterChange={handleFilterChange}
            scrollbar={true}
            filterType='genres'
            isMobile={isMobile}
          />
        </div>
        <div>
          <p>Страна:</p>
          <FilterMapping
            items={Object.values(COUNTRIES_LIST)}
            selectedFiltersKey={selectedFilters.countries}
            handleFilterChange={handleFilterChange}
            scrollbar={true}
            filterType='countries'
            isMobile={isMobile}
          />
        </div>
        <div className='mb-2 md:mb-0'>
          <p>Возрастное ограничение:</p>
          <FilterMapping
            items={Object.values(MPAA)}
            selectedFiltersKey={selectedFilters.mpaa}
            handleFilterChange={handleFilterChange}
            scrollbar={false}
            filterType='mpaa'
            isMobile={isMobile}
          />
        </div>
        <div>
          <p>Рейтинг:</p>
          <div style={{ width: isMobile ? '170px' : '300px' }}>
            <div className='flex items-center'>
              <p className='mr-2'>1</p>
              <Slider
                min={1}
                max={10}
                step={1}
                value={sliderValue}
                onChange={handleSliderChange}
                trackStyle={{ backgroundColor: '#5138E9' }}
                handleStyle={{ backgroundColor: '#5138E9' }}
              />
              <p className='ml-2'>10</p>
            </div>
            <p>Выбранная оценка: {sliderValue}</p>
          </div>
        </div>
        <div className='ml-0 md:ml-2'>
          <p>Год:</p>
          <FilterMapping
            items={Object.values(YEARS)}
            selectedFiltersKey={selectedFilters.year}
            handleFilterChange={handleFilterChange}
            scrollbar={true}
            filterType='year'
            isMobile={isMobile}
          />
        </div>
      </div>
      <button
        onClick={handleResetFilters}
        className='text-white bg-[#5138E9] px-6 py-2 rounded-lg hover:bg-red-500 mb-5'
      >
        Сбросить фильтры
      </button>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 gap-y-10'>
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
  );
};

export default MovieList;
