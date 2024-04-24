import { useStore } from 'effector-react';
import { userPlanListStore } from '../../MovieDetails/RatingStar.js';
import { useEffect } from 'react';
import { supabase } from '../../../../backend/apiClient/client.js';
import { userDataStore } from '../../../shared/store/UserStore.js';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const UserPlanList = () => {
  const data = useStore(userPlanListStore);
  const userData = useStore(userDataStore);
  const dataUserId = userData.user.id;

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data for user:', dataUserId);

      const { data, error } = await supabase.from('planned_list').select('*').eq('id', dataUserId);

      if (error) {
        console.error('Error fetching planned list:', error);
        return;
      }

      if (data) {
        console.log('Received data:', data);
        userPlanListStore.setState(data);
      }
    };

    console.log('Starting fetchData');
    fetchData();
  }, [dataUserId]);

  return (
    <div className='text-white bg-[#212124] h-[300px] mt-[100px] ml-2'>
      {!data || Object.keys(data).length === 0 ? (
        <div className='flex items-center mb-2'>
          <div className='flex-1 flex flex-col items-center'>
            <p className='text-xl ml-2'>Брадочек, у тебя нет фильмов</p>
          </div>
        </div>
      ) : (
        <div>
          <p className='text-3xl text-white mb-2'>Запланированные фильмы</p>
          <div className='flex items-center'>
            {Object.keys(data)
              .slice(0, 5)
              .map((movie_id) => {
                const film = data[movie_id];
                return (
                  <div key={movie_id} className='relative bg-[#45475B] w-[350px] h-[160px] rounded-lg mr-4'>
                    <div className='flex flex-row'>
                      <img
                        src={film.image || 'https://via.placeholder.com/180x280'}
                        alt='Movie Poster'
                        className='w-[96px] h-[140px] mt-2 ml-2 mr-2'
                      />
                      <div className='text-xl'>
                        <Link to={`/movie/${film.movie_id}`} className='font-bold mb-2'>
                          {film.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            <Link to='/profile/planned'>
              <ArrowForwardIosIcon className='text-white' />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
