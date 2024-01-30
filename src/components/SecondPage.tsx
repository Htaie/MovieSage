import { useEffect } from 'react';
import MainSlider from './sliders/MainSlider';
import GenresLinkCards from './cards/GenresLinkCards';
import Footer from './footer/Footer';
import NavBar from './navigation/NavBar';

export const SecondPage = () => {
  // useEffect(() => {
  //   const kinoboxScript = document.createElement('script');
  //   kinoboxScript.src = 'https://kinobox.tv/kinobox.min.js';
  //   kinoboxScript.async = true;

  //   kinoboxScript.onload = () => {
  //     new window.Kinobox('.kinobox_player', { search: { kinopoisk: '4647040' } }).init();
  //   };

  //   document.body.appendChild(kinoboxScript);

  //   return () => {
  //     document.body.removeChild(kinoboxScript);
  //   };
  // }, []);
  return (
    <div className="h-full bg-black">
      <NavBar />
      <MainSlider />
      <h1 className="text-3xl">Component</h1>
      {/* <div className="kinobox_player" style={{ width: '700px' }}></div> */}
      <p>sadsadadasdsa</p>
      <GenresLinkCards></GenresLinkCards>
      <Footer />
    </div>
  );
};
