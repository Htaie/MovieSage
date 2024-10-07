import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-scrollbars-custom';

export const SearchModal = ({ isMobile, onClose }: { isMobile: boolean; onClose: () => void }) => {
  const movies = Array.from({ length: 10 });
  const [genres] = useState(true);
  if (isMobile) {
    return <div className='top-[-93vh] left-0 absolute z-10 w-screen h-[795px] bg-[#242424]'>модалка</div>;
  }

  return (
    <div className='top-14 absolute overflow-hidden'>
      <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className='bg-[#242424] text-white md:w-[210px] lg:w-[320px] xl:w-[510px] h-[350px] rounded-b-xl'>
          <Scrollbar style={{ width: 530, height: 310 }} thumbYProps={{ style: { backgroundColor: '#5138E9' } }}>
            {movies.map((_, i) => (
              <Link key={i} to={`/movie/5435345`} onClick={onClose}>
                <div className='flex flex-row bg-[#242424] hover:bg-[#5138E9]'>
                  <img
                    src={'https://via.placeholder.com/50x70'}
                    alt='movie poster image'
                    className='max-w-[50px] max-h-[70px] rounded-2xl my-3 ml-3'
                  ></img>
                  <div className='text-2xl mt-4 ml-3'>
                    <h1>Название</h1>
                    {genres && <p className='text-sm text-gray-400'>год, жанры</p>}
                  </div>
                </div>
              </Link>
            ))}
          </Scrollbar>
          {genres && (
            <div className='flex justify-center mx-auto bg-[#242424] text-[#5138E9] hover:bg-[#5138E9] hover:text-white w-full h-[40px] rounded-b-xl'>
              <Link to={`/`} className='mt-2' onClick={onClose}>
                Ещё Результаты
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
