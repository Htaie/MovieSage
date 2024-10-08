import { FilterMapping } from '../../shared/components/FilterMapping/FilterMapping';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { COUNTRIES_LIST, GENRES, MPAA, YEARS } from '../../shared/constants/constants';
import { SelectedFilters } from '../../shared/types/MoviesTypes';
import { useMobile } from '../../shared/hooks/useMobile';

interface FilterPanelProps {
  selectedFilters: SelectedFilters;
  sliderValue: number;
  handleFilterChange: (filterType: keyof SelectedFilters, filterValue: string) => void;
  handleSliderChange: (newValue: number | number[]) => void;
  handleResetFilters: () => void;
}

export const FilterPanel = ({
  selectedFilters,
  sliderValue,
  handleFilterChange,
  handleSliderChange,
  handleResetFilters,
}: FilterPanelProps) => {
  const isMobile = useMobile();
  return (
    <div className='hidden md:block absolute top-[160px] right-14 space-y-5 text-white'>
      <div>
        <p className='text-xl'>Жанры:</p>
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
        <p className='text-xl'>Страна:</p>
        <FilterMapping
          items={Object.values(COUNTRIES_LIST)}
          selectedFiltersKey={selectedFilters.countries}
          handleFilterChange={handleFilterChange}
          scrollbar={true}
          filterType='countries'
          isMobile={isMobile}
        />
      </div>
      <div>
        <p className='text-xl'>Возрастное ограничение:</p>
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
        <p className='text-xl'>Рейтинг:</p>
        <div style={{ width: isMobile ? '170px' : '200px' }}>
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
      <div>
        <p className='text-xl'>Год:</p>
        <FilterMapping
          items={Object.values(YEARS)}
          selectedFiltersKey={selectedFilters.year}
          handleFilterChange={handleFilterChange}
          scrollbar={true}
          filterType='year'
          isMobile={isMobile}
        />
      </div>
      <button
        onClick={handleResetFilters}
        className='text-white bg-[#5138E9] px-6 py-2 rounded-lg hover:bg-red-500 mb-5'
      >
        Сбросить фильтры
      </button>
    </div>
  );
};
