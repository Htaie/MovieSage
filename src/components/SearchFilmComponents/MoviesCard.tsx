import React from 'react';
import { Link } from 'react-router-dom';

interface CardFilmData {
  id: number;
  name: string;
  rating: number;
  image: string;
}

interface SearchCardProps {
  data: CardFilmData[];
}

const SearchCard: React.FC<SearchCardProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const film = data[0];

  return (
    <>
      <Link
        to={'/film/'}
        className="relative w-[300px] h-[400px] rounded-lg overflow-hidden transition-transform transform hover:scale-105 mb-4"
      >
        <img src={film.image} alt="movies image" className="w-full h-full" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4">
          <h1 className="text-xl font-bold">{film.rating}</h1>
          <h1 className="text-lg">{film.name}</h1>
        </div>
      </Link>
    </>
  );
};

export default SearchCard;
