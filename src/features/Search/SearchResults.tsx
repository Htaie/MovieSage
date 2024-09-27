import { MovieType } from '../../shared/types/MoviesTypes';
import MovieCard from '../MovieCard';

interface SearchResultsProps {
  results: MovieType[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div className='w-[400px] grid grid-cols-2 md:w-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {results.length > 0 ? (
        results.map((result) => (
          <MovieCard
            key={result.id}
            id={result.id}
            poster={result.poster.url}
            rating={result.rating.imdb}
            name={result.name}
            year={result.year}
            movieLength={result.movieLength}
          />
        ))
      ) : (
        <div>Ничего не найдено</div>
      )}
    </div>
  );
};
