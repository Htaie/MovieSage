import { CircularProgress } from '@mui/material';
import GenresCards from '../cards/GenresCards';

const FilmInfo = ({ data }) => {
  // const data = [{ name: 'комедия' }, { name: 'драма' }, { name: 'сулит' }];
  // console.log(data, 'assss');
  if (data.length === 0 || !data) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-black">
        <CircularProgress sx={{ color: 'white' }} />
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="mt-3">
        <p>Год производства</p>
        <p>Страна</p>
        <p>Жанр</p>
        <p>Режиссер</p>
        <p>Сценарий</p>
        <p>Продюсер</p>
        <p>Оператор</p>
        <p>Композитор</p>
        <p>Художник</p>
        <p>Монтаж</p>
        <p>Бюджет</p>
        <p>Сборы в США</p>
        <p>Сборы в мире</p>
        <p>Сборы: Зрители</p>
        <p>Сборы в России</p>
        <p>Премьера в России</p>
        <p>Премьера в мире</p>
        <p>Релиз на DVD</p>
        <p>Релиз на Blu-ray</p>
        <p>Возраст</p>
        <p>Рейтинг MPAA</p>
        <p>Время</p>
      </div>
      <div className="mt-3 ml-10">
        <p>{data.year}</p>
        {data.countries.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))}
        <GenresCards data={data.genres} />
        <p>Оливье Накаш, Эрик Толедано</p>
        <p>Оливье Накаш, Эрик Толедано, Филипп Поццо ди Борго</p>
        <p>Арно Бертран, Доминик Бутонна, Юбер Кайлар, ...</p>
        <p>Матьё Вадпьед</p>
        <p>Людовико Эйнауди</p>
        <p>Франсуа Эммануэлли, Матьё Вадпьед, Изабель Паннетье, ...</p>
        <p>Дориан Ригаль-Ансу</p>
        <p>$ {data.budget.value}</p>
        <p>$ {data.fees.usa.value}</p>
        <p>$ {data.fees.world.value}</p>
        <p>$1 725 813</p>

        <p>{data.premiere.world}</p>
        <p>{data.premiere.russia}</p>
        <p>{data.premiere.dvd}</p>
        <p>{data.premiere.digital}</p>
        <p>{data.ageRating}</p>
        <p>R</p>
        <p>{data.movieLength} мин</p>
      </div>
    </div>
  );
};

export default FilmInfo;
