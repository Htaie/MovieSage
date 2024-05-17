import { useState } from 'react';
import { GENRES } from '../../constants/constants';
import { Scrollbar } from 'react-scrollbars-custom';
import { MainBtn } from '../buttons/MainBtn';

export const FilterModal = () => {
  const [selectedGenres, setSelectedGenres] = useState<{ [key: string]: boolean }>({});

  const handleGenreChange = (genre: string) => {
    setSelectedGenres({
      ...selectedGenres,
      [genre]: !selectedGenres[genre],
    });
  };

  const showSelectedGenres = () => {
    console.log(selectedGenres);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex bg-[#212124] border-2 border-[#5138E9] rounded-3xl text-white w-[800px] h-[600px] mb-3'>
        <div className='flex flex-col w-[200px] h-[575px] mt-3 ml-5' style={{ overflow: 'hidden' }}>
          <p>Жанры:</p>
          <Scrollbar style={{ width: 205 }} thumbYProps={{ style: { backgroundColor: '#5138E9', width: '2px' } }}>
            {Object.values(GENRES).map((genre: string) => (
              <div className='flex' key={genre}>
                <input
                  type='checkbox'
                  id={genre}
                  checked={selectedGenres[genre] || false}
                  onChange={() => handleGenreChange(genre)}
                  className='mr-2'
                />
                <p>{genre}</p>
              </div>
            ))}
          </Scrollbar>
        </div>
        <div>
          <p>Рейтинг</p>
          <p>Год</p>
          <p>Возрастное ограничение</p>
        </div>
      </div>
      <div className='bg-[#5138E9] w-[142px] h-[50px] pt-3 rounded-3xl'>
        <MainBtn text='Применить' onClick={showSelectedGenres} />
      </div>
    </div>
  );
};
