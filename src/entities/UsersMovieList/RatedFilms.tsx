import { userRatingStore } from '../../features/MovieDetails/RatingStar';
import { useStore } from 'effector-react';

export const RatedFilms = () => {
  const data = useStore(userRatingStore);
  console.log(data);

  return (
    <div className='bg-[#1C3334] text-white h-[1000px] pt-[100px]'>
      <img src={data?.MovieData.image} alt='MoviePoster' className='w-[200px]'></img>
      <p>{data?.clickedRating}</p>
      <p>{data?.MovieData.title}</p>
      <p>{data?.MovieData.year}</p>
    </div>
  );
};
