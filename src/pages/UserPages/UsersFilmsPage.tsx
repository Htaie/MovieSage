import { UsersFilmsList } from '../../entities/UsersMovieList/UsersFilmList';

export const UsersFilmsPage = ({ formType }: { formType: string }) => {
  return (
    <div className='bg-[#212124]'>
      <UsersFilmsList formType={formType} />
    </div>
  );
};
