import { userRatingStore } from '../../features/MovieDetails/RatingStar';
import { useStore } from 'effector-react';

export const RatedFilms = () => {
  const data = useStore(userRatingStore);
  console.log(data);

  return (
    <div className='bg-[#212124] text-white h-[1000px] pt-[100px]'>
      {Object.keys(data).map((filmId) => {
        const film = data[filmId];
        return (
          <div key={filmId}>
            <img src={film.image} alt='MoviePoster' className='w-[200px]' />
            <p>{film.clickedRating}</p>
            <p>{film.title}</p>
            <p>{film.year}</p>
          </div>
        );
      })}
    </div>
  );
};
