import { ConvertMinutes, RatingRounding, RatingScore } from '../shared/utils/textUtils';
import { Link } from 'react-router-dom';
const boxShadowStyle = {
  WebkitBoxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
  MozBoxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
  boxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
};

interface MovieCardProps {
  id: number;
  poster: string;
  rating: number;
  name: string;
  year: number;
  movieLength: number;
}

const MovieCard = ({ id, poster, rating, name, year, movieLength }: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className='relative bg-[212124] md:w-[288px] md:h-[432px] rounded-lg border-1 border-white overflow-hidden md:hover:scale-105 transition-transform  duration-700'>
        <img
          src={poster}
          alt='film image'
          className='rounded-lg object-cover w-full h-[300px] md:w-[288px] md:h-[432px] mb-3 md:mb-0'
        />
        <p className='text-white text-lg font-bold md:hidden'>{name}</p>
        <div
          className='absolute inset-0 rounded-lg opacity-0 transition-opacity md:w-[288px] md:h-[432px] box-shadow duration-1000 hover:opacity-100 hidden md:block'
          style={boxShadowStyle}
        >
          <span
            className='px-3 py-2 rounded-xl text-white absolute right-2 top-2'
            style={{ backgroundColor: RatingScore(rating) }}
          >
            {RatingRounding(rating)}
          </span>
          <div className='text-[#eae7dc] font-bold text-xl bottom-3 left-3 absolute'>
            <p className='text-white'>{name}</p>
            <span className='mr-2'>{year}</span>
            <span>{ConvertMinutes(movieLength)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
