import { UserMovieList } from './UserMovieList';
import { PROFILE_ROUTE } from '../../../shared/constants/constants';

export const UserMovieListPanel = () => {
  return (
    <div className='flex'>
      <UserMovieList formType={PROFILE_ROUTE.PLAN} />
      <UserMovieList formType={PROFILE_ROUTE.RATED} />
    </div>
  );
};
