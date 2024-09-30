import ActorsInfo from '../../features/MovieDetails/ActorsCarousel/Actors';

const ActorsInMovie = ({ data }: any) => {
  return (
    <div className='md:mb-[30px]'>
      <p className='font-bold text-3xl mb-[30px]'>Актеры:</p>
      <ActorsInfo data={data} />
    </div>
  );
};

export default ActorsInMovie;
