export const getEmojiForGenre = (genre: string) => {
  switch (genre) {
    case 'фэнтези':
    case 'fantasy':
      return '🧙‍♂️';

    case 'мелодрама':
    case 'melodrama':
      return '😢';

    case 'семейный':
    case 'family':
      return '👨‍👩‍👧';
    case 'новости':
    case 'news':
      return '📰';
    case 'реальное ТВ':
    case 'tv':
      return '📺';

    case 'комедия':
    case 'comedy':
      return '😄';

    case 'спорт':
    case 'sports':
      return '🏀';

    case 'ром-комы':
    case 'romantic comedy':
      return '❤️😄';

    case 'музыка':
    case 'music':
      return '🎵';

    case 'мюзикл':
    case 'musical':
      return '💃';
    case 'военный':
    case 'war':
      return '🫡';

    case 'детектив':
    case 'detective':
      return '🕵️‍♂️';
    case 'детский':
    case 'kids':
      return '👶';

    case 'триллер':
    case 'thriller':
      return '😱';

    case 'приключения':
    case 'adventure':
      return '🌍';

    case 'фантастика':
    case 'science fiction':
      return '🚀';

    case 'мультфильм':
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
    case 'для взрослых':
    case 'huisden':
      return '🔞';

    case 'криминал':
    case 'crime':
      return '🕵️‍♂️';

    case 'биография':
    case 'biography':
      return '📜';

    case 'документальный':
    case 'documentary':
      return '📽️';

    case 'ужасы':
    case 'horror':
      return '👻';

    case 'вестерн':
    case 'western':
      return '🤠';
    case 'игра':
    case 'game':
      return '🎮';
    case 'история':
    case 'history':
      return '📖';
    case 'ток-шоу':
    case 'television':
      return '👸';

    case 'мистика':
    case 'mystery':
      return '🔮';
    case 'концерт':
    case 'concert':
      return '🎤';
    case 'фильм-нуар':
    case 'film-nouar':
      return '🎞️';
    case 'церемония':
    case 'ceremony':
      return '🤵‍♂️';

    case 'короткометражка':
    case 'short film':
      return '🎥';

    default:
      return '😊';
  }
};
