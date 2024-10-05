export interface MovieType {
  logo: {
    url: string;
  };
  id: number;
  type: string;
  name: string;
  rating: {
    imdb: number;
    kp: number;
  };
  persons: Array<{
    name: string;
    photo: string;
    id: number;
  }>;
  movieLength: number;
  description: string;
  videos: {
    trailers: Array<{
      url: string;
    }>;
  };
  poster: {
    url: string;
  };

  slug: string;
  genres: Array<{ name: string; slug: string }>;
  countries: Array<{ name: string }>;
  year: number;
  shortDescription: string;
  backdrop: {
    url: string;
  };
}

export interface SelectedFilters {
  genres: { [key: string]: boolean };
  mpaa: { [key: string]: boolean };
  countries: { [key: string]: boolean };
  year: { [key: string]: boolean };
  rating: { [key: string]: boolean };
}
