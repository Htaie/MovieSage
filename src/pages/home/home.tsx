import MainSlider from '../../widgets/SlidersForMovie/MainSlider';

import GenreBlock from '../../widgets/GenreBlock';

export const Home = (): JSX.Element => {
  return (
    <div className='h-full bg-[#212124] '>
      <div className='container mx-auto'>
        <MainSlider />
        <GenreBlock />
      </div>
    </div>
  );
};
