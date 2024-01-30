import { Link } from 'react-router-dom';
import { getEmojiForGenre } from '../../hooks/GengresSmile';

const GenresCards = (data: any) => {
  return (
    <>
      {data.data.map((item: any, index: number) => (
        <Link
          key={index}
          className="backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30  px-3 py-2  rounded-3xl text-xl mx-2"
          to={`/genre/`}
        >
          {getEmojiForGenre(item.name)} {item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : ''}
        </Link>
      ))}
    </>
  );
};

export default GenresCards;
