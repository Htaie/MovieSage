import MovieList from '../widgets/MovieList';
import { FormatingName } from '../shared/utils/textUtils';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const { name } = useParams();
  //   bg-[#1A1A1D]
  return (
    <div className='bg-[#212124] h-full min-h-screen '>
      <h1 className='text-white text-3xl mb-10 pt-36 ml-20 '>{FormatingName(name)}</h1>
      <MovieList name={name} />
    </div>
  );
};

export default MoviePage;
