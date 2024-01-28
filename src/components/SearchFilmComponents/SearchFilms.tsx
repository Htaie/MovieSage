import SearchCard from './SearchFilmCard';

const Data = [
  {
    id: 1,
    name: 'Лучший фильм',
    rating: 8.5,
    image: 'https://pbs.twimg.com/media/ER2GYFAWoAAOyE6.jpg',
  },
];

const SearchFilms = () => {
  const repeatedData = Array.from({ length: 15 }, (_, index) => ({ ...Data[0], id: index + 1 }));

  return (
    <div className="bg-black p-[128px]">
      <h1 className="text-white text-3xl mb-5">Поиск фильмов и сериалов</h1>
      <div className="grid grid-cols-5 gap-5">
        {repeatedData.map((film) => (
          <SearchCard key={film.id} data={[film]} />
        ))}
      </div>
    </div>
  );
};

export default SearchFilms;
