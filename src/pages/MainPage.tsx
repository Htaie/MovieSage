import MainSlider from '../components/sliders/MainSlider';
import GenresLinkCards from '../components/cards/GenresLinkCards';
import Footer from '../components/footer/Footer';
import NavBar from '../components/navigation/NavBar';
import { FilmByGenreSlider } from '../components/sliders/FilmsByGenreSlider';

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
