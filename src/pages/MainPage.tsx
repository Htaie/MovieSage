import MainSlider from '../components/MoviesToDisplay/SlidersForMovie/MainSlider';
import GenresLinkCards from '../GenresToDisplay/GenresCards/GenresLinkCards';
import { FilmByGenreSlider } from '../GenresToDisplay/SlidersForGenres/FilmsByGenreSlider';

export const SecondPage = () => {
  return (
    <div className="h-full bg-black">
      <MainSlider />
      <GenresLinkCards></GenresLinkCards>
      <FilmByGenreSlider type={'anime'} />
      <FilmByGenreSlider type={'movie'} />
      <FilmByGenreSlider genre={'фэнтези'} />
    </div>
  )
}
