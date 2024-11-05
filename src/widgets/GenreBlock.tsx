import { GENRES } from '../shared/constants/constants';
import { FilmByGenreSlider } from '../entities/SlidersForGenres/FilmsByGenreSlider';
import { useMobile } from '../shared/hooks/useMobile';
import CompletedTorrents from '../features/TorrentsCarousel/CompletedTorrents';

const GenreBlock = () => {
  const isMobile = useMobile();

  return (
    <>
    <CompletedTorrents/>
      {Object.keys(GENRES)
        .slice(0, 2)
        .map((genre) => (
          <FilmByGenreSlider genre={GENRES[genre]} isMobile={isMobile} />
        ))}
    </>
  );
};

export default GenreBlock;
