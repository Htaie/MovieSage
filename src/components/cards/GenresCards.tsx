import { Link } from 'react-router-dom';

const GenresCards = (data: any) => {
  console.log(data.data);

  const getEmojiForGenre = (genre: string) => {
    switch (genre) {
      case 'фэнтези':
      case 'fantasy':
        return '🧙‍♂️';

      case 'мелодрамы':
      case 'melodrama':
        return '😢';

      case 'семейный':
      case 'family':
        return '👨‍👩‍👧';

      case 'комедия':
      case 'comedy':
        return '😄';

      case 'про спорт':
      case 'sports':
        return '🏀';

      case 'ром-комы':
      case 'romantic comedy':
        return '❤️😄';

      case 'музыкальные':
      case 'musical':
        return '🎵';

      case 'детектив':
      case 'detective':
        return '🕵️‍♂️';

      case 'триллер':
      case 'thriller':
        return '😱';

      case 'приключения':
      case 'adventure':
        return '🌍';

      case 'фантастика':
      case 'science fiction':
        return '🚀';

      case 'мультфильмы':
      case 'animated':
        return '🎬';

      case 'аниме':
      case 'anime':
        return '😺';

      case 'боевик':
      case 'action':
        return '💥';

      case 'драма':
      case 'drama':
        return '🎭';

      case 'криминал':
      case 'crime':
        return '🕵️‍♂️';

      case 'биография':
      case 'biography':
        return '📜';

      case 'док':
      case 'documentary':
        return '📽️';

      case 'ужасы':
      case 'horror':
        return '👻';

      case 'вестерны':
      case 'western':
        return '🤠';

      case 'мистика':
      case 'mystery':
        return '🔮';

      case 'короткометражки':
      case 'short film':
        return '🎥';

      default:
        return '😊';
    }
  };
  return (
    <>
      {data.data.map((item: any) => (
        <Link
          className="backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30  px-3 py-2  rounded-3xl text-xl mx-2"
          to={`/genre/`}
        >
          {getEmojiForGenre(item.name)} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Link>
      ))}
    </>
  );
};

export default GenresCards;
