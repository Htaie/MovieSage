import GenresCards from '../../GenreLink/GenreLink.tsx';

export const MovieGenresList = ({ data }: any): JSX.Element => {
  return (
    <div className='flex mb-8'>
      <GenresCards genres={data.genres}/>
    </div>
  );
};
