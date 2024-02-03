import { createBrowserRouter } from 'react-router-dom';
import { Component } from '../component';
import { SecondPage } from '../pages/MainPage';
import SearchFilms from '../pages/MoivesPage';
import AboutMoviePage from '../pages/AboutMoviePage';
import MoviePlaeer from '../components/UI/MoviePlayer';
import { AboutActorPage } from '../pages/AboutActorPage';

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
]);
