import { Link } from 'react-router-dom';
import { FormatingName, getEmojiForGenre } from '../../shared/utils/textUtils';
import { MovieType } from '../../shared/types/MoviesTypes';
interface Props {
  genres: MovieType['genres'];
}

const GenreLink = ({genres}: Props): JSX.Element => {
  return (
    <>
      {genres?.map((item) => (
        <Link
          key={item.name}
          className={
            'bg-white/10 hover:backdrop-blur-xl hover:bg-white/30 px-2 py-1 md:px-3 md:py-2 rounded-3xl md:text-xl mx-2 my-2'
          }
          to={`/genre/${item.name}`}
        >
          <span>
            {getEmojiForGenre(item.name)} {FormatingName(item.name)}
          </span>
        </Link>
      ))}
    </>
  );
};

export default GenreLink;
