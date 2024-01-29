import SearchCard from '../components/SearchFilmComponents/MoviesCard';
import NavBar from '../components/navigation/NavBar';

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
    <>
      <NavBar />
      <div className="bg-black h-full ">
        <h1 className="text-white text-3xl mb-10 pt-36 ml-20 ">Поиск фильмов и сериалов</h1>
        <div className=" container mx-auto my-0 flex flex-wrap justify-between">
          {repeatedData.map((film) => (
            <SearchCard key={film.id} data={[film]} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchFilms;
