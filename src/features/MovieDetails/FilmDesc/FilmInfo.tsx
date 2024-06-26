import { MovieType } from '../../../shared/types/MoviesTypes';
import MainLoader from '../../../shared/loader/MainLoader';
interface FilmInfoProps {
  data: MovieType;
}

const FilmInfo = ({ data }: FilmInfoProps): JSX.Element => {
  if (data?.persons.length === 0) {
    return <MainLoader />;
  }
  return (
    <div className='flex grid grid-cols-1 gap-y-2 md:grid-cols-[1fr,2fr]'>
      <div className='flex flex-col'>
        <p>Режиссер</p>
        <p>Оливье Накаш, Эрик Толедано</p>
      </div>
      <div className='flex flex-col'>
        <p>Сценарий</p>
        <p>Оливье Накаш, Эрик Толедано, Филипп Поццо ди Борго</p>
      </div>
      <div className='flex flex-col'>
        <p>Продюсер</p>
        <p>Арно Бертран, Доминик Бутонна, Юбер Кайлар, ...</p>
      </div>
      <div className='flex flex-col'>
        <p>Оператор</p>
        <p>Матьё Вадпьед</p>
      </div>
      <div className='flex flex-col'>
        <p>Композитор</p>
        <p>Людовико Эйнауди</p>
      </div>
    </div>
  );
};

export default FilmInfo;
