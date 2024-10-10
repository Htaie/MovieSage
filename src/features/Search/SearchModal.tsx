import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-scrollbars-custom';
import { MovieType } from '../../shared/types/MoviesTypes';
import MainLoader from '../../shared/loader/MainLoader';

interface SearchModalProps {
  isMobile: boolean;
  onClose: () => void;
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: MovieType[];
  loading: boolean;
}

export const SearchModal = ({
  isMobile,
  onClose,
  searchValue,
  onSearchChange,
  searchResults,
  loading,
}: SearchModalProps) => {
  const data = searchResults;

  return (
    <div
      className={`absolute ${isMobile ? 'top-[-93vh] left-0 w-screen h-[795px] bg-[#242424]' : 'top-14 overflow-hidden'}`}
    >
      <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        {isMobile && (
          <div className='bg-[#242424] p-4'>
            <input
              type='text'
              placeholder='Поиск фильмов...'
              className='w-full h-10 px-3 text-black rounded-md'
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        )}
        <div className={`overflow-auto h-[${isMobile ? 'auto' : '724px'}]`}>
          <Scrollbar
            style={{ width: isMobile ? '100%' : 530, height: isMobile ? '724px' : '370px' }}
            thumbYProps={{ style: { backgroundColor: '#5138E9' } }}
          >
            {loading ? (
              <MainLoader />
            ) : (
              <>
                {data.slice(0, 10).map((result) => (
                  <Link key={result.id} to={`/movie/${result.id}`} onClick={onClose}>
                    <div className='flex flex-row bg-[#242424] hover:bg-[#5138E9]'>
                      <img
                        src={result.poster.url || 'https://via.placeholder.com/50x70'}
                        alt='movie poster image'
                        className='max-w-[50px] max-h-[70px] rounded-2xl my-3 ml-3'
                      />
                      <div className='text-2xl mt-4 ml-3'>
                        <h1>{result.name}</h1>
                        {result.genres && result.genres.length > 0 && (
                          <p className='text-sm text-gray-400'>
                            {result.year}, {result.genres[0].name}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {data.length > 10 && (
                  <div
                    className={`flex justify-center mx-auto bg-[#242424] text-[#5138E9] w-full h-[40px] ${isMobile ? '' : 'hover:bg-[#5138E9] hover:text-white rounded-b-xl'}`}
                  >
                    <Link to={`/search/${searchValue}`} className='mt-2' onClick={onClose}>
                      Ещё Результаты
                    </Link>
                  </div>
                )}
              </>
            )}
          </Scrollbar>
        </div>
      </motion.div>
    </div>
  );
};