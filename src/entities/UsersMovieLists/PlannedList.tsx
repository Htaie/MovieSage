import { useStore } from 'effector-react';
import { userPlanListStore } from '../../features/MovieDetails/RatingStar';

export const PlannedList = () => {
  const data = useStore(userPlanListStore);
  return <div>PlannedList</div>;
};
