import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const SearchComponent = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const inputVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: '200%' },
  };

  return (
    <div className='flex items-center relative w-[330px]' style={{ overflow: 'hidden' }}>
      <motion.div animate={showSearchInput ? 'open' : 'closed'} variants={inputVariants} transition={{ duration: 0.5 }}>
        <input
          type='text'
          placeholder='Поиск'
          className='text-black w-[300px] h-[35px] rounded-[4px] outline-none pl-10'
        ></input>
      </motion.div>
      <SearchIcon
        style={{ position: 'relative', left: showSearchInput ? '-300px' : '0' }}
        className={`${showSearchInput ? 'text-black' : ''} ml-2 hover:cursor-pointer hover:text-[#5138E9]`}
        onClick={toggleSearchInput}
      />
    </div>
  );
};
