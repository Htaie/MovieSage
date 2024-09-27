import { SearchBlock } from '../../features/Search/SearchBlock';

export const SearchPage = () => {
  return (
    <div className='bg-[#212124] h-full min-h-screen text-white pt-5 md:pt-20'>
      <div className='container mx-auto px-2 md:px-0 flex flex-col justify-center'>
        <SearchBlock />
      </div>
    </div>
  );
};
