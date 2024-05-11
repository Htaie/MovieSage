import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { searchResultsStore } from '../../features/Search/SearchComponent.tsx';
import { useStore } from 'effector-react';

export const SearchResults = () => {
  const searchResults = useStore(searchResultsStore);

  if (!searchResults) {
    return <div>Нет результатов поиска</div>;
  }

  return (
    <div className='mt-[35px] absolute' style={{ overflow: 'hidden', overflowY: 'auto', maxHeight: '330px' }}>
      <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className='bg-[#242424] text-white w-[512px] h-[350px] rounded-b-xl'>
          {searchResults.map((result, index) => (
            <div key={index} className='flex flex-row bg-[#242424]'>
              <img
                src={result.poster.url || 'https://via.placeholder.com/50x70'}
                alt='movie poster image'
                className='max-w-[50px] max-h-[70px] rounded-2xl mt-3 ml-3'
              ></img>
              <div className='text-2xl mt-4 ml-3'>
                <Link to={`/movie/${result.id}`} className='hover:text-[#5138E9]'>
                  {result.name}
                </Link>
                {result.genres && result.genres.length > 0 && (
                  <p className='text-sm text-gray-400'>
                    {result.year}, {result.genres[0].name}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className='flex justify-center mx-auto bg-[#242424] text-[#5138E9] hover:bg-[#5138E9] hover:text-white w-[512px] h-[40px]'>
            <Link to={'#'} className='mt-2'>
              Ещё Результаты
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
