import { createBrowserRouter } from 'react-router-dom';
import { Component } from '../component';
import { SecondPage } from '../components/SecondPage';
import SearchFilms from '../pages/MoivesPage';
import FilmPage from '../pages/FilmPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SecondPage />,
  },
  {
    path: '/2',
    element: <Component />,
  },
  {
    path: '/test',
    element: <SearchFilms />,
  },
  {
    path: '/film/${film.id}',
    element: <FilmPage />,
  },
]);
