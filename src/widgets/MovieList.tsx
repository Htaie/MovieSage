import { useEffect, useState } from 'react';
import { API_URL, TOKEN } from '../shared/constants/constants';
import MovieCard from '../features/MovieCard';
import MainLoader from '../shared/loader/MainLoader';
import { MovieType } from '../shared/types/MoviesTypes';
import { SelectedFilters } from '../shared/types/MoviesTypes';
import { filterConfig } from '../shared/config/FilterConfig';
import { FilterPanel } from '../features/Filter/FilterPanel';
import { useMobile } from '../shared/hooks/useMobile';

const appendFilterToUrl = (
  url: string,
  selectedFilter: { [key: string]: boolean },
  paramName: string,
  shouldEncode: boolean = true,
  ratingImdb: boolean
): string => {
  const activeFilters = Object.keys(selectedFilter).filter((key) => selectedFilter[key]);

  if (activeFilters.length > 0) {
    activeFilters.forEach((filter) => {
      const encodedFilter = shouldEncode ? encodeURIComponent(filter) : filter;
      url += `&${paramName}=${ratingImdb ? encodedFilter + '-10' : encodedFilter}`;
    });
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
  const [debouncedFilters, setDebouncedFilters] = useState<SelectedFilters>({
    genres: {},
    mpaa: {},
    countries: {},
    year: {},
    rating: {},
  });
  const [sliderValue, setSliderValue] = useState(5);
  const [filterChanged, setFilterChanged] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const isMobile = useMobile();

  const handleFilterChange = (filterType: keyof SelectedFilters, filterValue: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterType]: {
        ...prevState[filterType],
        [filterValue]: !prevState[filterType][filterValue],
      },
    }));
    setFilterChanged(true);
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

    setFilterChanged(true);
  };

  const validTypes = ['anime', 'movie', 'tv-series'];
  const typeList = validTypes.includes(name);

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(selectedFilters);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [selectedFilters]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);

        let url = `${API_URL}movie?page=${pageNumber}&limit=25&sortField=votes.imdb&sortType=1&votes.imdb=150000-6666666&notNullFields=poster.url`;

        if (typeList) {
          url = `${API_URL}movie?page=${pageNumber}&limit=10&sortField=votes.imdb&sortType=1&votes.imdb=${name === 'anime' ? '5000-666666' : '300000-6666666'}&type=${name}&notNullFields=poster.url`;
        } else {
          url += `&genres.name=${name}`;
        }

        filterConfig.forEach(({ key, paramName, shouldEncode, ratingImdb }) => {
          url = appendFilterToUrl(
            url,
            debouncedFilters[key as keyof SelectedFilters],
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
        if (filterChanged) {
          setData(responseData.docs);
          setFilterChanged(false);
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
  }, [pageNumber, name, debouncedFilters]);

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

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };

  return (
    <div className='md:flex md:flex-row-reverse container mx-auto'>
      <button
        className='text-white bg-[#5138E9] px-6 py-2 rounded-lg hover:bg-red-500 mb-5 md:hidden'
        onClick={() => setOpenFilters(!openFilters)}
      >
        Фильтры
      </button>
      {openFilters || !isMobile ? (
        <FilterPanel
          selectedFilters={selectedFilters}
          sliderValue={sliderValue}
          handleFilterChange={handleFilterChange}
          handleSliderChange={handleSliderChange}
          handleResetFilters={handleResetFilters}
          handleCloseFilters={handleCloseFilters}
        />
      ) : null}
      {openFilters && isMobile ? null : (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-2 gap-x-10 md:mr-[60px] 2xl:mr-[140px]'>
          {data.map((item: any, index: number) => (
            <MovieCard
              key={index}
              id={item.id}
              poster={item.poster.url}
              rating={item.rating.imdb}
              name={item.name}
              seriesLength={item.movieLength}
            />
          ))}
        </div>
      )}
      <div className='flex justify-center'>{loading && pageNumber > 1 && <MainLoader />}</div>
    </div>
  );
};

export default MovieList;
