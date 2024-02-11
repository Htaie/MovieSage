import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../components/authComponents/LoginPage';
import RegisterPage from '../components/authComponents/RegisterPage';
import { SecondPage } from '../pages/MainPage';
import SearchFilms from '../pages/MoviesPages/MoviesList';
import AboutMoviePage from '../pages/MoviesPages/AboutMoviePage';
import MoviePlaeer from '../components/UI/MoviePlayer';
import { AboutActorPage } from '../pages/MoviesPages/AboutActorPage';
import PagesTests from '../PagesTests';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SecondPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/genre/:name',
    element: <SearchFilms />,
  },
  {
    path: '/movie/:id',
    element: <AboutMoviePage />,
  },
  {
    path: '/watch/:id',
    element: <MoviePlaeer />,
  },
  {
    path: '/actor/:id',
    element: <AboutActorPage />,
  },
  {
    path: '/test',
    element: <PagesTests />,
  },
]);
