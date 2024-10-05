import { GENRES } from '../shared/constants/constants';
import GenreLinkSlider from '../features/GenreCarousel/GenreLinkSlider';
import { FilmByGenreSlider } from '../entities/SlidersForGenres/FilmsByGenreSlider';
import { useMobile } from '../shared/hooks/useMobile';

const GenreBlock = () => {
  const isMobile = useMobile();

  return (
    <>
      <GenreLinkSlider genre={GENRES} isMobile={isMobile} />
      {Object.keys(GENRES)
        .slice(0, 5)
        .map((genre) => (
          <FilmByGenreSlider genre={GENRES[genre]} isMobile={isMobile} />
        ))}
    </>
  );
};

export default GenreBlock;
