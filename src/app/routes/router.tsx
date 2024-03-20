import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/Auth/LoginPage';
import RegisterPage from '../../pages/Auth/RegisterPage';
import AboutMoviePage from '../../pages/Movies/AboutMovie';
import { AboutActorPage } from '../../pages/Movies/AboutActor';
import PagesTests from '../../pages/PagesTests';
import App from '../App';
import { Route } from '../../shared/constants/constants';
import { Home } from '../../pages/Home/home';
import MoviePage from '../../pages/MoviePage';
import { ProfilePage } from '../../pages/UserPages/ProfilePage';
import { ProfileSettingPage } from '../../pages/UserPages/ProfileSettingPage';
import { RatedFilmsPage } from '../../pages/UserPages/RatedFilmsPage';

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
      // {
      //   path: Route.SETTINGS,
      //   element: <ProfileSettingPage />,
      // },
      // {
      //   path: Route.RATED,
      //   element: <RatedFilmsPage />,
      // },
      {
        path: Route.GENRE,
        element: <MoviePage />,
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
