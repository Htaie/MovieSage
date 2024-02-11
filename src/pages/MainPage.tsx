import MainSlider from '../components/MoviesToDisplay/SlidersForMovie/MainSlider';
import GenresLinkCards from '../GenresToDisplay/GenresCards/GenresLinkCards';
import Footer from '../components/Navigation/Footer/Footer';
import NavBar from '../components/Navigation/Header/NavBar';
import { FilmByGenreSlider } from '../GenresToDisplay/SlidersForGenres/FilmsByGenreSlider';

export const SecondPage = () => {
  return (
    <div className="h-full bg-black">
      <NavBar />
      <MainSlider />
      <GenresLinkCards></GenresLinkCards>
      <FilmByGenreSlider type={'anime'} />
      <FilmByGenreSlider type={'movie'} />
      <FilmByGenreSlider genre={'фэнтези'} />
      <Footer />
    </div>
  );
};
