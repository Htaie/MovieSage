import { useParams } from 'react-router-dom';
import { MainBtn } from '../../shared/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useRef } from 'react';
import GenresCards from '../../features/GenreLink/GenreLink.tsx';
import TrailerModal from '../../features/MovieDetails/TrailerModal.tsx';
import CloseIcon from '@mui/icons-material/Close';
import MoviePlayer from '../../shared/UI/MoviePlayer.tsx';
import MainLoader from '../../shared/loader/MainLoader.tsx';
import MovieDescription from '../../widgets/MovieDescription/MovieDescription.tsx';
import { RaitingInfo } from '../../features/MovieDetails/RatingStar.tsx';
import ActorsInMovie from '../../widgets/MovieDescription/ActorsInMovie.tsx';
import FilmInfo from '../../features/MovieDetails/FilmDesc/FilmInfo.tsx';
import MovieDataFetcher from '../../features/MovieDetails/MovieDataFetcher/MovieDataFetcher.tsx';

const AboutMoviePage = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const data = MovieDataFetcher(id); //я добавил в новом файлике фиче MovieDataFetcher для id тип стринг, вроде там должен быть намбер но и вроде стринг подходит потому что там запрос как никак и вот тут красным подсвечивает хз поч
  const watchFilmRef = useRef<null | HTMLDivElement>(null);

  if (data == null) {
    return <MainLoader />;
  }
  if (openModal) {
    document.body.style.overflow = 'hidden';
    scrollTo(0, 0);
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div className='bg-black'>
      <div className='container mx-auto text-white pt-[100px] pb-[100px]'>
        {openModal && (
          <div className='w-full h-full absolute overflow-hidden'>
            <div
              className=' bg-black opacity-75 absolute z-40  w-full h-full'
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <CloseIcon
                onClick={() => {
                  setOpenModal(false);
                }}
                className='text-white absolute right-3 top-3 cursor-pointer'
                style={{ fontSize: '50px' }}
              />
            </div>
            <div className='absolute top-1/2 left-1/2  z-50 transform -translate-x-1/2 -translate-y-1/2'>
              <TrailerModal trailer={data.videos.trailers[0].url} />
            </div>
          </div>
        )}
        <div className='container mx-auto text-white'>
          <div className=' flex'>
            <div>
              <img
                src={data.poster.url.length > 0 ? data.poster.url : 'https://placehold.co/300x430'}
                alt='film image'
                className='w-[300px] h-[430px] rounded-lg mt-4 mb-4'
              ></img>
            </div>
            <div className='flex flex-col ml-[50px] mt-4'>
              {data.logo.url.length > 0 ? (
                <img src={data.logo.url} alt='film logo' className='h-10 w-[300px] mb-3 ' />
              ) : (
                <h1 className='text-4xl font-bold mt-4 mb-[40px]'>{data.name}</h1>
              )}
              <div className='flex mb-8'>
                <GenresCards genres={data.genres} width={30} />
              </div>
              <div className='flex mb-4'>
                <p>{data.year}</p>
                <div className='flex'>
                  {data.countries.map((item, index) => (
                    <p key={index} className='mr-2'>
                      {item.name}
                    </p>
                  ))}
                </div>
                <p>{data.movieLength} мин</p>
              </div>
              <MovieDescription data={data} />
              <div className='mb-6'>
                <MainBtn
                  text='Посмотреть трейлер'
                  onClick={() => {
                    setOpenModal(true);
                  }}
                ></MainBtn>
                <MainBtn
                  text='Посмотреть фильм'
                  // to={`/watch/${data.id}`}
                  onClick={() => {
                    watchFilmRef?.current?.scrollIntoView({ behavior: 'smooth' });
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
            </div>
          </div>
        </div>
        <div className='mb-[80px]' ref={watchFilmRef}>
          <p className='font-bold text-3xl mb-[60px]'>Смотреть фильм {data.name} онлайн без регистрации и СМС:</p>
          <RaitingInfo data={data} />
          <ActorsInMovie data={data} />
          <FilmInfo data={data} />
          <MoviePlayer id={data.id} />
        </div>
      </div>
    </div>
  );
};

export default AboutMoviePage;
