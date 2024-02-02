import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MoviePlaeer = () => {
  const { id } = useParams();
  useEffect(() => {
    const kinoboxScript = document.createElement('script');
    kinoboxScript.src = 'https://kinobox.tv/kinobox.min.js';
    kinoboxScript.async = true;

    kinoboxScript.onload = () => {
      new window.Kinobox('.kinobox_player', { search: { kinopoisk: `${id}` } }).init();
    };

    document.body.appendChild(kinoboxScript);

    return () => {
      document.body.removeChild(kinoboxScript);
    };
  }, []);

  return (
    <div className="w-full h-full bg-black">
      <div className="kinobox_player w-full h-full"></div>
    </div>
  );
};

export default MoviePlaeer;
