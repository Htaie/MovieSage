import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/Auth/LoginPage';
import RegisterPage from '../../pages/Auth/RegisterPage';
import { ProfilePage } from '../../pages/UserPages/ProfilePage';
import SearchFilms from '../../pages/Movies/MoviesList';
import AboutMoviePage from '../../pages/Movies/AboutMovie';
import { AboutActorPage } from '../../pages/Movies/AboutActor';
import PagesTests from '../../pages/PagesTests';
import App from '../App';
import { Route } from '../../shared/constants/constants';
import { Home } from '../../pages/Home/home';

export const router = createBrowserRouter([
  {
    path: Route.HOME,
    element: <App />,
    children: [
      {
        path: Route.HOME,
        element: <Home />,
      },
      {
        path: Route.LOGIN,
        element: <LoginPage />,
      },
      {
        path: Route.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: Route.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: Route.GENRE,
        element: <SearchFilms />,
      },
      {
        path: Route.MOVIE,
        element: <AboutMoviePage />,
      },
      {
        path: Route.ACTOR,
        element: <AboutActorPage />,
      },
      {
        path: Route.TEST,
        element: <PagesTests />,
      },
    ],
  },
]);
