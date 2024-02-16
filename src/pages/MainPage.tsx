import MainSlider from '../components/MoviesToDisplay/SlidersForMovie/MainSlider';
import GenresLinkCards from '../GenresToDisplay/GenresCards/GenresLinkCards';
import { FilmByGenreSlider } from '../GenresToDisplay/SlidersForGenres/FilmsByGenreSlider';

export const SecondPage = (): JSX.Element => {
  const genresToDisplay = [
    'фэнтези', 'мелодрама', 'семейный', 'новости', 'реальное ТВ',
    'комедия', 'спорт', 'ром-комы', 'музыка', 'мюзикл', 'военный',
    'детектив', 'детский', 'триллер', 'приключения', 'фантастика',
    'мультфильм', 'аниме', 'боевик', 'драма', 'для взрослых',
    'криминал', 'биография', 'документальный', 'ужасы', 'вестерн',
    'игра', 'история', 'ток-шоу', 'мистика', 'концерт', 'фильм-нуар',
    'церемония', 'короткометражка'
  ];


  return (
    <div className="h-full bg-black">
      <MainSlider />
      <GenresLinkCards></GenresLinkCards>
      {genresToDisplay.map((genre, index) => (
        <FilmByGenreSlider
          key={index}
          genre={genre} type={''} />
      ))}

    </div>
  )
}
