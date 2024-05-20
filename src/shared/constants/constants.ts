export const API_URL = 'https://api.kinopoisk.dev/v1.4/';
export const MOVIE_GENRES_API_URL = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';

export const TOKEN = import.meta.env.REACT_APP_SECRET_TOKEN;
export const SECOND_TOKEN = import.meta.env.REACT_APP_SECOND_TOKEN;
export const SUPABASE_KEY = import.meta.env.REACT_APP_SUPABASE_KEY;
export const CDNURL = import.meta.env.REACT_APP_CDNURL;

export const Route = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile/:id',
  SETTINGS: '/profile/settings',
  RATED: '/profile/ratedlist',
  PLAN: '/profile/planned',
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

export const MPAA = ['g', 'nc17', 'pg', 'pg13', '!r'];

export const COUNTRIES_LIST = [
  'США',
  'Россия',
  'Австралия',
  'Австрия',
  'Азербайджан',
  'Аргентина',
  'Армения',
  'Беларусь',
  'Бельгия',
  'Бразилия',
  'Великобритания',
  'Венгрия',
  'Германия',
  'Гонконг',
  'Дания',
  'Египет',
  'Израиль',
  'Индия',
  'Индонезия',
  'Иран',
  'Ирландия',
  'Испания',
  'Италия',
  'Казахстан',
  'Канада',
  'Китай',
  'Мексика',
  'Нидерланды',
  'Норвегия',
  'Польша',
  'Португалия',
  'Румыния',
  'Сербия',
  'Сингапур',
  'Словакия',
  'Словения',
  'Таиланд',
  'Турция',
  'Украина',
  'Финляндия',
  'Франция',
  'Чехия',
  'Швейцария',
  'Швеция',
  'Южная Корея',
  'Япония',
];

export const YEARS = ['2024', '2023', '2021-2022', '2016-2020', '2010-2015', '2000-2010', '1990', '1980'];

export const PROFILE_ROUTE = {
  RATED: 'ratedlist',
  PLAN: 'planned',
  SETTINGS: 'settings',
};
