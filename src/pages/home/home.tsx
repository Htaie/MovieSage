import MainSlider from '../../widgets/SlidersForMovie/MainSlider';
import { UserMovieListPanel } from '../../features/ProfileInfo/UserLists/UserMovieListsPanel';
import GenreBlock from '../../widgets/GenreBlock';

export const Home = (): JSX.Element => {
  return (
    <div className='h-full bg-[#212124] '>
      <div className='container mx-auto'>
        {/* <MainSlider /> */}
        <UserMovieListPanel />
        <GenreBlock />
      </div>
    </div>
  );
};
