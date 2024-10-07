import MovieList from '../widgets/MovieList';
import { FormatingName } from '../shared/utils/textUtils';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const { name } = useParams() as any
  return (
    <div className='bg-[#212124] h-full min-h-screen px-2 md:px-0'>
      <h1 className='container mx-auto text-white text-3xl mb-10 pt-5 md:pt-[100px]'>{FormatingName(name)}</h1>
      <MovieList name={name} />
    </div>
  );
};

export default MoviePage;
