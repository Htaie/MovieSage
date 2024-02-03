import { createBrowserRouter } from 'react-router-dom';
import { Component } from '../component';
import LoginPage from '../components/authComponents/LoginPage';
import RegisterPage from '../components/authComponents/RegisterPage';
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
]);
