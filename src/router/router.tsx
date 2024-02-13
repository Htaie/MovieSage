import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/AuthPages/LoginPage'
import RegisterPage from '../pages/AuthPages/RegisterPage'
import { SecondPage } from '../pages/MainPage';
import SearchFilms from '../pages/MoviesPages/MoviesList';
import AboutMoviePage from '../pages/MoviesPages/AboutMoviePage';
import { AboutActorPage } from '../pages/MoviesPages/AboutActorPage';
import PagesTests from '../PagesTests';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
        path: '/actor/:id',
        element: <AboutActorPage />,
      },
      {
        path: '/test',
        element: <PagesTests />,
      },
    ],
  },
]);
