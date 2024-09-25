import { MovieType } from '../../shared/types/MoviesTypes';

interface SearchResultsProps {
  results: MovieType[];
}

export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((result) => <div key={result.id}>{result.name}</div>)
      ) : (
        <div>Ничего не найдено</div>
      )}
    </div>
  );
};
