import { useEffect } from 'react';
import NavBar from './navigation/NavBar';
import MainSlider from './sliders/MainSlider';

export const SecondPage = () => {
  // useEffect(() => {
  //   const kinoboxScript = document.createElement('script');
  //   kinoboxScript.src = 'https://kinobox.tv/kinobox.min.js';
  //   kinoboxScript.async = true;

  //   kinoboxScript.onload = () => {
  //     new window.Kinobox('.kinobox_player', { search: { kinopoisk: '535341' } }).init();
  //   };

  //   document.body.appendChild(kinoboxScript);

  //   return () => {
  //     document.body.removeChild(kinoboxScript);
  //   };
  // }, []);
  return (
    <div>
      <NavBar />
      <MainSlider />
      <h1 className="text-3xl">Component</h1>
      {/* <div className="kinobox_player" style={{ width: '700px' }}></div> */}
      <p>sadsadadasdsa</p>
    </div>
  );
};
