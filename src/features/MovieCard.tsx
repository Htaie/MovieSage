import React from 'react';
import { ConvertMinutes, RatingRounding, RatingScore } from '../shared/utils/textUtils';
import { Link } from 'react-router-dom';
const boxShadowStyle = {
  WebkitBoxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
  MozBoxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
  boxShadow: '6px 1px 10px 200px rgba(0, 0, 0, 0.35) inset',
};

const MovieCard = ({ id, poster, rating, name, year, movieLength }: MovieType) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className='relative'>
        <img src={poster} alt='film image' className='rounded-lg object-cover w-[288px] h-[432px] '></img>
        <div
          className='absolute inset-0  opacity-0 transition-opacity box-shadow duration-300 hover:opacity-100 '
          style={boxShadowStyle}
        >
          <span
            className='px-3 py-2 rounded-xl text-white absolute right-2 top-2'
            style={{ backgroundColor: RatingScore(rating) }}
          >
            {RatingRounding(rating)}
          </span>
          <div className=' text-gray-400  text-xl bottom-3 left-3 absolute'>
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
