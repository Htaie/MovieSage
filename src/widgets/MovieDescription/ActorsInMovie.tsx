import ActorsInfo from '../../features/MovieDetails/ActorsCarousel/Actors';

const ActorsInMovie = ({ data }: any) => {
  return (
    <div>
      <p className='font-bold text-3xl mb-[20px]'>Актеры:</p>
      <ActorsInfo data={data} />
    </div>
  );
};

export default ActorsInMovie;
