import { Scrollbar } from 'react-scrollbars-custom';
import { SelectedFilters } from '../../types/MoviesTypes';
import { MPAA } from '../../constants/constants';

interface CustomScrollbarProps {
  items: string[];
  selectedFiltersKey: { [key: string]: boolean };
  handleFilterChange: (filterType: keyof SelectedFilters, filterValue: string) => void;
  scrollbar: boolean;
  filterType: keyof SelectedFilters;
  isMobile: boolean;
  mpaa?: boolean;
}

export const FilterMapping = ({
  items,
  selectedFiltersKey,
  handleFilterChange,
  scrollbar,
  filterType,
  isMobile,
  mpaa,
}: CustomScrollbarProps) => {
  return (
    <>
      {scrollbar ? (
        <Scrollbar
          style={{ width: isMobile ? '97%' : 205, height: 132 }}
          thumbYProps={{ style: { backgroundColor: '#5138E9', width: '10px' } }}
        >
          {items.map((item: string) => (
            <div
              className='flex border-b-2 border-[#5138E9] py-1 cursor-pointer'
              key={item}
              onClick={() => handleFilterChange(filterType, item)}
            >
              <input
                type='checkbox'
                id={item}
                checked={selectedFiltersKey[item] || false}
                onChange={() => handleFilterChange(filterType, item)}
                className='mr-2 pointer-events-none'
              />
              <p>{item}</p>
            </div>
          ))}
        </Scrollbar>
      ) : (
        <>
          {items.map((item: string) => (
            <div
              className='flex border-b-2 border-[#5138E9] py-1 cursor-pointer w-[96%] md:w-[205px]'
              key={item}
              onClick={() => handleFilterChange(filterType, item)}
            >
              <input
                type='checkbox'
                id={item}
                checked={selectedFiltersKey[item] || false}
                onChange={() => handleFilterChange(filterType, item)}
                className='mr-2 pointer-events-none'
              />
              <p>{mpaa ? `${MPAA[item as keyof typeof MPAA]}` : item}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
