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
    <div className='grid grid-cols-1 md:w-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3'>
      {results.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          poster={movie.poster.url}
          rating={movie.rating.imdb}
          name={movie.name}
          seriesLength={movie.movieLength}
        />
      ))}
    </div>
  );
};
