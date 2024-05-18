import { useState } from 'react';
import { GENRES, MPAA, COUNTRIES_LIST, YEARS } from '../../constants/constants';
import { MainBtn } from '../buttons/MainBtn';
import { FilterMapping } from '../../components/FilterMapping/FilterMapping';

export interface SelectedFilters {
  genres: { [key: string]: boolean };
  mpaa: { [key: string]: boolean };
  countries: { [key: string]: boolean };
  year: { [key: string]: boolean };
}

export const FilterModal = () => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    genres: {},
    mpaa: {},
    countries: {},
    year: {},
  });

  const handleFilterChange = (filterType: keyof SelectedFilters, filterValue: string) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterType]: {
        ...prevState[filterType],
        [filterValue]: !prevState[filterType][filterValue],
      },
    }));
  };

  const showSelectedSettings = () => {
    console.log(selectedFilters);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex bg-[#212124] border-2 border-[#5138E9] rounded-3xl text-white w-[800px] h-[600px] mb-3'>
        <div className='flex flex-col w-[200px] h-[570px] mt-3 ml-5' style={{ overflow: 'hidden' }}>
          <p className='mb-3'>Жанры:</p>
          <FilterMapping
            items={Object.values(GENRES)}
            selectedFiltersKey={selectedFilters.genres}
            handleFilterChange={handleFilterChange}
            scrollbar={true}
            filterType='genres'
          />
        </div>
        <div>
          <div className='flex flex-col w-[200px] h-[400px] mt-3 ml-5'>
            <p className='mb-3'>Страна:</p>
            <FilterMapping
              items={Object.values(COUNTRIES_LIST)}
              selectedFiltersKey={selectedFilters.countries}
              handleFilterChange={handleFilterChange}
              scrollbar={true}
              filterType='countries'
            />
          </div>
          <div className='flex flex-col w-[200px] mt-[15px] ml-5'>
            <p className='mb-3'>Возрастное ограничение:</p>
            <FilterMapping
              items={Object.values(MPAA)}
              selectedFiltersKey={selectedFilters.mpaa}
              handleFilterChange={handleFilterChange}
              scrollbar={false}
              filterType='mpaa'
            />
          </div>
        </div>
        <div>
          <div>
            <p>Рейтинг:</p>
          </div>
          <div className='flex flex-col mt-3 ml-5'>
            <p className='mb-3'>Год:</p>
            <FilterMapping
              items={Object.values(YEARS)}
              selectedFiltersKey={selectedFilters.year}
              handleFilterChange={handleFilterChange}
              scrollbar={false}
              filterType='year'
            />
          </div>
        </div>
      </div>
      <div className='bg-[#5138E9] w-[142px] h-[50px] pt-3 rounded-3xl'>
        <MainBtn text='Применить' onClick={showSelectedSettings} />
      </div>
    </div>
  );
};
