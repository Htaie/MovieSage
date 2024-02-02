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
    <div className="mt-3">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Режиссер</p>
        <p>Оливье Накаш, Эрик Толедано</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Сценарий</p>
        <p>Оливье Накаш, Эрик Толедано, Филипп Поццо ди Борго</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Продюсер</p>
        <p>Арно Бертран, Доминик Бутонна, Юбер Кайлар, ...</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Оператор</p>
        <p>Матьё Вадпьед</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Композитор</p>
        <p>Людовико Эйнауди</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Художник</p>
        <p>Франсуа Эммануэлли, Матьё Вадпьед, Изабель Паннетье, ...</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Монтаж</p>
        <p>Дориан Ригаль-Ансу</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Бюджет</p>
        <p>$ {data.budget.value}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Сборы в США</p>
        <p>$ {data.fees.usa.value}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Сборы в мире</p>
        <p>$ {data.fees.world.value}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Сборы в России</p>
        <p>$1 725 813</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Премьера в России</p>
        <p>{data.premiere.russia}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Премьера в мире</p>
        <p>{data.premiere.world}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Релиз на DVD</p>
        <p>{data.premiere.dvd}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Релиз на Blu-ray</p>
        <p>{data.premiere.digital}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Возраст</p>
        <p>{data.ageRating}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,2fr]">
        <p>Рейтинг MPAA</p>
        <p>R</p>
      </div>
    </div>
  );
};

export default FilmInfo;
