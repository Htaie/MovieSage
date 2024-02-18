import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import { SecondPage } from '../pages/home/home';
import SearchFilms from '../pages/Movies/MoviesList';
import AboutMoviePage from '../pages/Movies/AboutMovie';
import { AboutActorPage } from '../pages/Movies/AboutActor';
import PagesTests from '../pages/PagesTests';
import App from '../app/App';

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
