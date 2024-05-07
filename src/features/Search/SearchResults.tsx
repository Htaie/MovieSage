import { Link } from 'react-router-dom';

export const SearchResults = () => {
  return (
    <div className='mt-[35px] absolute'>
      <div className='bg-[#242424] text-white w-[330px] h-[350px] rounded-b-xl'>
        <div className='flex flex-row'>
          <img
            src='https://placeholder.pics/svg/100x130'
            alt='movie poster image'
            className='rounded-2xl mt-3 ml-3'
          ></img>
          <div className='text-2xl mt-4 ml-3'>
            <Link to='#' className='hover:text-[#5138E9]'>
              Название
            </Link>
            <p className='text-sm text-gray-400'>Год, Жанр</p>
          </div>
        </div>
      </div>
    </div>
  );
};
