import MainSlider from '../../widgets/SlidersForMovie/MainSlider';

import GenreBlock from '../../widgets/GenreBlock';

export const Home = (): JSX.Element => {
  return (
    <div className='h-full bg-[#1C3334]'>
      <MainSlider />
      <GenreBlock />
    </div>
  );
};
