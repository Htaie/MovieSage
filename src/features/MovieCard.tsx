import {  RatingRounding, RatingScore } from '../shared/utils/textUtils';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: number;
  poster: string;
  rating: number;
  name: string;
  seriesLength: number;
}

const MovieCard = ({ id, poster, rating, name, seriesLength }: MovieCardProps) => {
  function declOfNum(value: number, words: any[]) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }
  return (
    <Link to={`/movie/${id}`} className='h-[500px] w-[238px]'>
      <div className='relative bg-[212124] md:w-[238px] md:h-[380px] rounded-lg border-1 border-white overflow-hidden '>
        <img
          src={poster}
          alt='film image'
          className='rounded-lg object-cover w-full h-[380px] md:w-[238px] md:h-[380px] mb-3 md:mb-0'
        />

        <span
          className='px-3 py-2 rounded-xl text-white absolute left-2 top-2'
          style={{ backgroundColor: RatingScore(rating) }}
        >
          {RatingRounding(rating)}
        </span>
      </div>
      <div className='text-[#eae7dc] font-bold text-xl left-3 absolute w-[238px]'>
        <p className='text-white line-clamp-2'>{name}</p>
        {seriesLength !== null && seriesLength !== undefined ? (
          <span className=' text-gray-400'>
            {seriesLength} {declOfNum(seriesLength, ['эпизод', 'эпизода', 'эпизодов'])}
          </span>
        ) : (
          <span className=' text-gray-400'> Фильм</span>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
