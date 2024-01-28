import React from 'react';

interface FilmData {
  id: number;
  name: string;
  rating: number;
  image: string;
}

interface SearchCardProps {
  data: FilmData[];
}

const SearchCard: React.FC<SearchCardProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const film = data[0];

  return (
    <div className="relative w-[300px] h-[400px] rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img src={film.image} alt={''} className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4">
        <h1 className="text-xl font-bold">{film.rating}</h1>
        <h1 className="text-lg">{film.name}</h1>
      </div>
    </div>
  );
};

export default SearchCard;
