import { MovieType } from '../../shared/types/MoviesTypes';
import MovieCard from '../MovieCard';

interface SearchResultsProps {
  results: MovieType[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  if (!results || results.length === 0) {
    return <div className='text-white'>Ничего не найдено</div>;
  }

  return (
    <div className='w-[400px] grid grid-cols-2 md:w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {results.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          poster={movie.poster.url}
          rating={movie.rating.imdb}
          name={movie.name}
          year={movie.year}
          movieLength={movie.movieLength}
        />
      ))}
    </div>
  );
};
