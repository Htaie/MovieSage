import { createBrowserRouter } from 'react-router-dom';
import AboutMoviePage from '../../pages/Movies/AboutMovie';
import { AboutActorPage } from '../../pages/Movies/AboutActor';
import PagesTests from '../../pages/PagesTests';
import App from '../App';
import { Route } from '../../shared/constants/constants';

import MoviePage from '../../pages/MoviePage';
import { SearchPage } from '../../pages/search/SearchPage';
import { Home } from '../../pages/home/home';

export const router = createBrowserRouter([
  {
    path: Route.HOME,
    element: <App />,
    children: [
      {
        path: Route.BROWSE,
        element: <Home />,
      },
      {
        path: Route.SEARCH,
        element: <SearchPage />,
      },
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
      {
        path: Route.NOTIFICATIONS,
        element: <PagesTests />,
      },
      {
        path: Route.WATCHLIST,
        element: <PagesTests />,
      },
    ],
  },
]);
