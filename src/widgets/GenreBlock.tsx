import React from 'react';
import GenreLink from '../features/GenreLink/GenreLink';
import { GENRES } from '../shared/constants/constants';
import GenreLinkSlider from '../features/GenreCarousel/GenreLinkSlider';
import { FilmByGenreSlider } from '../entities/SlidersForGenres/FilmsByGenreSlider';

const GenreBlock = () => {
  console.log(GENRES);
  return (
    <>
      <GenreLinkSlider genre={GENRES} />
      {Object.keys(GENRES).map((genre) => (
        <FilmByGenreSlider genre={GENRES[genre]} />
      ))}
    </>
  );
};

export default GenreBlock;
