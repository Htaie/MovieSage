export const API_URL = 'https://api.kinopoisk.dev/v1.4/';
export const MOVIE_GENRES_API_URL = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';

export const TOKEN = import.meta.env.VITE_SECRET_TOKEN;

console.log('dd', TOKEN);

export const Route = {
  HOME: '/',
  PLAN: '/profile/planned',
  GENRE: '/genre/:name',
  MOVIE: '/movie/:id',
  ACTOR: '/actor/:id',
  TEST: '/test',
  SEARCH: '/search',
};
interface Genres {
  [key: string]: string;
}

export const GENRES: Genres = {
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

export const MPAA = [
  'Без ограничений',
  'Только для взрослых (NC-17)',
  'С родительским контролем (PG)',
  'Не рекомендовано до 13 лет (PG-13)',
  'Запрещено до 17 лет (R)',
];

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

export const movieData = [
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 12245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 12312,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 12331245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 1244331245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 123231245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 1234321245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 1231545245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 1235341245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 13234231245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 12331231245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
  {
    logo: {
      url: 'placehold.co/400x550',
    },
    id: 1231768245,
    type: 'фильм',
    name: 'Побег из беброушенка',
    rating: {
      imdb: 7.9,
      kp: 9.4,
    },
    persons: [
      {
        name: 'Тим Роббинс',
        photo: 'placehold.co/400x550',
        id: 12312323,
      },
    ],
    movieLength: 120,
    description:
      'Один челик занюхнул жоска беброчки и потом попал в такую заварушку что его месили в пол самые темные ребята в николаевском гетто,после этого он позвал весь район водой и очень отважных друзей чтобы победить главного злодея Сан-Диего Дугласа.',
    videos: {
      trailers: [
        {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      ],
    },
    poster: {
      url: 'https://www.mockofun.com/wp-content/uploads/2019/10/movie-poster-credits-178.jpg',
    },

    slug: 'хз какой-то слаг',
    genres: [{ name: 'бебровик', slug: 'слаг' }],
    countries: [{ name: 'Япония' }],
    year: 2000,
    shortDescription:
      'Диего Марадонна, Лионель Месси унижают Португалию и ее самого грязного мальчика криштиану роналду',
    backdrop: {
      url: 'placehold.co/400x550',
    },
  },
];
