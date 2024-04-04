import { GENRES } from '../shared/constants/constants';
import GenreLinkSlider from '../features/GenreCarousel/GenreLinkSlider';
import { FilmByGenreSlider } from '../entities/SlidersForGenres/FilmsByGenreSlider';

const GenreBlock = () => {
  return (
    <>
      <GenreLinkSlider genre={GENRES} />
      {Object.keys(GENRES)
        .slice(0, 5)
        .map((genre) => (
          <FilmByGenreSlider genre={GENRES[genre]} />
        ))}
    </>
  );
};

export default GenreBlock;
