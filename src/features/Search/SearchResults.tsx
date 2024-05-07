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
        <div className='bg-[#242424] text-white w-[330px] h-[350px] rounded-b-xl'>
          {searchResults.map((result, index) => (
            <div key={index} className='flex flex-row bg-[#242424]'>
              <img
                src={result.poster.url || 'https://via.placeholder.com/100x120'}
                alt='movie poster image'
                className='w-[100px] h-[120px] rounded-2xl mt-3 ml-3'
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
        </div>
      </motion.div>
    </div>
  );
};
