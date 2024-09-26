import { useEffect, useState } from 'react';
import { SearchResults } from './SearchResults';
import { useSearch } from './useSearch';
import SearchIcon from '@mui/icons-material/Search';
import { SelectedFilters } from '../../shared/types/MoviesTypes';
import { GENRES, MPAA, COUNTRIES_LIST, YEARS } from '../../shared/constants/constants';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FilterMapping } from './FilterMapping';
import { useMobile } from '../../shared/hooks/useMobile';

export const SearchBlock = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    genres: {},
    mpaa: {},
    countries: {},
    year: {},
    rating: {},
  });
  const [sliderValue, setSliderValue] = useState(5);
  const searchResults = useSearch({ debouncedSearchInput, pageNumber, selectedFilters });

  const isMobile = useMobile();

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearchInput(searchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchValue]);

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

  const handleFilterChange = (filterType: keyof SelectedFilters, filterValue: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterType]: {
        ...prevState[filterType],
        [filterValue]: !prevState[filterType][filterValue],
      },
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const applyFilters = (filters: SelectedFilters) => {
    setSelectedFilters(filters);
    setPageNumber(1);
  };

  return (
    <>
      <div className='mx-auto flex relative w-full md:w-[530px] mb-2'>
        <input
          type='text'
          placeholder='Поиск'
          className='text-black w-full md:w-[530px] h-[35px] rounded-[4px] outline-none pl-5'
          value={searchValue}
          onChange={handleInputChange}
        />
        <SearchIcon className='absolute right-2 top-1/2 -translate-y-1/2 text-black' />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-10'>
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
        className='w-[200px] h-[35px] mx-auto text-white bg-[#5138E9] rounded-[4px]'
        onClick={() => applyFilters(selectedFilters)}
      >
        Применить
      </button>
      {searchResults && <SearchResults results={searchResults} />}
    </>
  );
};
