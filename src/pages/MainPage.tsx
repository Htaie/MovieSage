import MainSlider from '../components/sliders/MainSlider';
import GenresLinkCards from '../components/cards/GenresLinkCards';
import Footer from '../components/footer/Footer';
import NavBar from '../components/navigation/NavBar';

export const SecondPage = () => {
  return (
    <div className="h-full bg-black">
      <NavBar />
      <MainSlider />
      <GenresLinkCards></GenresLinkCards>
      <Footer />
    </div>
  );
};
