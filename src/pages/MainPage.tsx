import MainSlider from '../components/MoviesToDisplay/SlidersForMovie/MainSlider';
import GenresLinkCards from '../GenresToDisplay/GenresCards/GenresLinkCards';
import { FilmByGenreSlider } from '../GenresToDisplay/SlidersForGenres/FilmsByGenreSlider';

export const SecondPage = (): JSX.Element => {
  return (
    <div className="h-full bg-black">
      <MainSlider />
      <GenresLinkCards></GenresLinkCards>
      <FilmByGenreSlider type={'anime'} genre={''} />
      <FilmByGenreSlider type={'movie'} genre={''} />
      <FilmByGenreSlider genre={'фэнтези'} type={''} />
    </div>
  )
}
