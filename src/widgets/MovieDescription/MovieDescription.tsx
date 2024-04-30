import { MovieGenresList } from '../../features/MovieDetails/FilmDesc/MovieGenresList';
import { MovieLogo } from '../../features/MovieDetails/FilmDesc/MovieLogo';
import { MovieSummary } from '../../features/MovieDetails/FilmDesc/MovieSummary';
import MovieSynopsis from '../../features/MovieDetails/FilmDesc/MovieSynopsis';

const MovieDescription = ({ data }: any) => {
  return (
    <>
      {/* лого украл какой-то чупапи мунянь с kinopoisk.dev <MovieLogo data={data} /> */}
      <MovieGenresList data={data} />
      <MovieSummary data={data} />
      <MovieSynopsis data={data} />
    </>
  );
};

export default MovieDescription;
