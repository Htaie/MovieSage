import { Scrollbar } from 'react-scrollbars-custom';
import { SelectedFilters } from '../../UI/modal/FilterModal';

interface CustomScrollbarProps {
  items: string[];
  selectedFiltersKey: { [key: string]: boolean };
  handleFilterChange: (filterType: keyof SelectedFilters, filterValue: string) => void;
  scrollbar: boolean;
  filterType: keyof SelectedFilters;
}

export const FilterMapping = ({
  items,
  selectedFiltersKey,
  handleFilterChange,
  scrollbar,
  filterType,
}: CustomScrollbarProps) => {
  return (
    <>
      {scrollbar ? (
        <Scrollbar style={{ width: 205 }} thumbYProps={{ style: { backgroundColor: '#5138E9', width: '2px' } }}>
          {items.map((item: string) => (
            <div className='flex' key={item}>
              <input
                type='checkbox'
                id={item}
                checked={selectedFiltersKey[item] || false}
                onChange={() => handleFilterChange(filterType, item)}
                className='mr-2'
              />
              <p>{item}</p>
            </div>
          ))}
        </Scrollbar>
      ) : (
        <>
          {items.map((item: string) => (
            <div className='flex' key={item}>
              <input
                type='checkbox'
                id={item}
                checked={selectedFiltersKey[item] || false}
                onChange={() => handleFilterChange(filterType, item)}
                className='mr-2'
              />
              <p>{item}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
