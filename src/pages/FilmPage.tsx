import { Link } from 'react-router-dom';

const FilmPage = () => {
  return (
    <div className="container mx-auto">
      <div className=" flex">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/ru/b/b9/Intouchables.jpg"
            alt="film image"
            className="w-[300px] h-[400px] mt-4 mb-4"
          ></img>
          <img
            src="https://img05.rl0.ru/afisha/375x210q85i/s2.afisha.ru/mediastorage/4b/c9/1cecdc4a0a0d464faec4995bc94b.jpg"
            alt="film trailer"
            className="w-[300px] h-[175px]"
          ></img>
        </div>
        <div className="flex flex-col ml-[50px]">
          <h1 className="text-4xl font-bold mt-4 mb-[40px]">1+1(2011)</h1>
          <div>
            <button className="w-[200px] h-[50px] text-xl font-bold rounded-3xl transition-colors hover:bg-gray-200 transition-transform transform hover:scale-105 mb-2">
              Буду смотреть
            </button>
            <button className="w-[50px] h-[50px] text-2xl font-bold rounded-3xl transition-colors hover:bg-gray-200 transition-transform transform hover:scale-105 mb-2 ml-2">
              ...
            </button>
          </div>
          <h1 className="text-4xl font-bold">О фильме</h1>
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
              <p>2011</p>
              <p>Франция</p>
              <p>драма, комедия, биография</p>
              <p>Оливье Накаш, Эрик Толедано</p>
              <p>Оливье Накаш, Эрик Толедано, Филипп Поццо ди Борго</p>
              <p>Арно Бертран, Доминик Бутонна, Юбер Кайлар, ...</p>
              <p>Матьё Вадпьед</p>
              <p>Людовико Эйнауди</p>
              <p>Франсуа Эммануэлли, Матьё Вадпьед, Изабель Паннетье, ...</p>
              <p>Дориан Ригаль-Ансу</p>
              <p>€9 500 000</p>
              <p>+ $10 198 820</p>
              <p>+ $416 389 690 = $426 588 510</p>
              <p>Франция 19.4 млн, Германия 9.1 млн, Испания 2.6 млн, ...</p>
              <p>$1 725 813</p>
              <p>26 апреля 2012, «Каскад фильм»</p>
              <p>23 сентября 2011, ...</p>
              <p>28 мая 2012, «Новый Диск»</p>
              <p>25 июня 2012, «Новый Диск»</p>
              <p>18+</p>
              <p>R</p>
              <p>112 мин. / 01:52</p>
            </div>
          </div>
        </div>
        <div className="mt-4 ml-[40px]">
          <p className="font-bold text-2xl">8.8</p>
          <p className="mb-2">Количество оценок</p>
          <button className="w-[200px] h-[30px] rounded-2xl font-bold transition-colors hover:bg-gray-200 transition-transform transform hover:scale-105 mb-2">
            Оценить фильм
          </button>
          <div className="mb-[200px]">
            <Link to={''} className="transition-colors hover:text-red-500">
              Количество рецензий
            </Link>
          </div>
          <p className="font-bold">В главных ролях</p>
          <Link to={''} className="block transition-colors hover:text-red-500 mb-2">
            Омар Си
          </Link>
          <Link to={''} className="text-red-500">
            Количество актеров
          </Link>
          <p className="font-bold mt-[30px]">Роли дублировали</p>
          <Link to={''} className="block transition-colors hover:text-red-500 mb-2">
            Владимир Зайцев
          </Link>
          <Link to={''} className="text-red-500">
            Количество актеров дубляжа
          </Link>
          <img
            src="https://m.the-flow.ru/uploads/images/origin/15/81/73/83/93/abc2e62.png"
            alt="nominations"
            className="w-[120px] h-[100px]"
          ></img>
        </div>
      </div>
      <p className=" mt-20" style={{ maxWidth: '800px' }}>
        Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который
        менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы.
        Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь
        аристократа дух приключений.
      </p>
    </div>
  );
};

export default FilmPage;
