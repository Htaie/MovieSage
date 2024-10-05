export const filterConfig = [
  { key: 'genres', paramName: 'genres.name', shouldEncode: true, ratingImdb: false },
  { key: 'mpaa', paramName: 'ratingMpaa', shouldEncode: false, ratingImdb: false },
  { key: 'countries', paramName: 'countries.name', shouldEncode: true, ratingImdb: false },
  { key: 'year', paramName: 'year', shouldEncode: true, ratingImdb: false },
  { key: 'rating', paramName: 'rating.imdb', shouldEncode: false, ratingImdb: true },
];
