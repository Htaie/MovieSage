import FilmInfo from '../../features/MovieDetails/FilmDesc/FilmInfo';

const MovieCreated = ({ data }: any) => {
  return (
    <div className='mb-[80px]'>
      <FilmInfo data={data} />
    </div>
  );
};

export default MovieCreated;
