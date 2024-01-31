import { Link } from 'react-router-dom';
import { FormatingName, getEmojiForGenre } from '../../textUtils';

const GenresCards = (data: any) => {
  return (
    <>
      {data.data.map((item: any, index: number) => (
        <Link
          key={item.name}
          className="backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30  px-3 py-2  rounded-3xl text-xl mx-2"
          to={`/genre/`}
        >
          {getEmojiForGenre(item.name)} {FormatingName(item.name)}
        </Link>
      ))}
    </>
  );
};

export default GenresCards;
