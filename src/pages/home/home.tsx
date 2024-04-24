import MainSlider from '../../widgets/SlidersForMovie/MainSlider';
import { UserPlanList } from '../../features/ProfileInfo/UserLists/UserPlanList';
import GenreBlock from '../../widgets/GenreBlock';

export const Home = (): JSX.Element => {
  return (
    <div className='h-full bg-[#212124] '>
      <div className='container mx-auto'>
        <MainSlider />
        <UserPlanList />
        <GenreBlock />
      </div>
    </div>
  );
};
