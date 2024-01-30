import { Link } from 'react-router-dom';
import { MainBtn } from '../components/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilmInfo from '../components/MovieDetails/FilmInfo.tsx';
import DubbingActorsInfo from '../components/MovieDetails/DubbingActorsInfo.tsx';
import ActorsInfo from '../components/MovieDetails/ActorsInfo.tsx';

const AboutMoviePage = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto text-white">
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
            <div className="mb-6">
              <MainBtn
                text="Посмотреть трейлер"
                to={''}
                onClick={() => {
                  console.log('Click');
                }}
              ></MainBtn>
              <MainBtn
                text={<MoreHorizIcon />}
                to={''}
                onClick={() => {
                  console.log('Click');
                }}
              ></MainBtn>
            </div>
            <h1 className="text-4xl font-bold">О фильме</h1>
            <FilmInfo />
          </div>
          <div className="mt-4 ml-[40px]">
            <p className="font-bold text-2xl">8.8</p>
            <p className="mb-2">Количество оценок</p>
            <MainBtn
              text={'Оценить фильм'}
              onClick={() => {
                console.log('Liked');
              }}
              style={{ marginBottom: '20px' }}
            />
            <div className="mb-[200px]">
              <Link to={''} className="transition-colors hover:text-red-500">
                Количество рецензий
              </Link>
            </div>
            <p className="font-bold">В главных ролях</p>
            <ActorsInfo />
            <Link to={''} className="text-red-500">
              Количество актеров
            </Link>
            <p className="font-bold mt-[30px]">Роли дублировали</p>
            <DubbingActorsInfo />
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
          менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из
          тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь
          аристократа дух приключений.
        </p>
      </div>
    </div>
  );
};

export default AboutMoviePage;
