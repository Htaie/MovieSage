export const API_URL = 'https://api.kinopoisk.dev/v1.4/';
export const MOVIE_GENRES_API_URL = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';

export const TOKEN = import.meta.env.REACT_APP_SECRET_TOKEN;
export const SUPABASE_KEY = import.meta.env.REACT_APP_SUPABASE_KEY;
export const CDNURL = import.meta.env.REACT_APP_CDNURL;

export const Route = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  GENRE: '/genre/:name',
  MOVIE: '/movie/:id',
  ACTOR: '/actor/:id',
  TEST: '/test',
};

export const GENRES = {
  anime: 'аниме',
  biography: 'биография',
  action: 'боевик',
  western: 'вестерн',
  war: 'военный',
  detective: 'детектив',
  adult: 'для взрослых',
  documentary: 'документальный',
  drama: 'драма',
  game: 'игра',
  history: 'история',
  comedy: 'комедия',
  concert: 'концерт',
  short: 'короткометражка',
  crime: 'криминал',
  melodrama: 'мелодрама',
  animation: 'мультфильм',
  musical: 'мюзикл',
  adventure: 'приключения',
  family: 'семейный',
  thriller: 'триллер',
  horror: 'ужасы',
  science_fiction: 'фантастика',
  film_noir: 'фильм-нуар',
  fantasy: 'фэнтези',
};
