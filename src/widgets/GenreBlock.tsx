import { GENRES } from '../shared/constants/constants';
import GenreLinkSlider from '../features/GenreCarousel/GenreLinkSlider';
import { FilmByGenreSlider } from '../entities/SlidersForGenres/FilmsByGenreSlider';
import { useEffect, useState } from 'react';

const GenreBlock = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
