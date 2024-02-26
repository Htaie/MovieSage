import { useParams } from 'react-router-dom';
import { MainBtn } from '../../shared/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useRef, useEffect } from 'react';
import TrailerModal from '../../features/MovieDetails/TrailerModal.tsx';
import CloseIcon from '@mui/icons-material/Close';
import MoviePlayer from '../../shared/UI/MoviePlayer.tsx';
import MainLoader from '../../shared/loader/MainLoader.tsx';
import MovieDescription from '../../widgets/MovieDescription/MovieDescription.tsx';
import ActorsInMovie from '../../widgets/MovieDescription/ActorsInMovie.tsx';
import FilmInfo from '../../features/MovieDetails/FilmDesc/FilmInfo.tsx';
import { MovieDataFetcher, movieDataStore } from '../../entities/MovieDataFetcher/MovieDataFetcher.tsx';
import { useStore } from 'effector-react';

const AboutMoviePage = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    MovieDataFetcher(id);
  }, [id]); //у меня ощущения будто это не совсем то что нужно но если честно то я вообще чет не смог ничего больше сделать рабочего с этим вонючим effector'ом

  const data = useStore(movieDataStore);
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
          <ActorsInMovie data={data} />
          <FilmInfo data={data} />
          <MoviePlayer id={data.id} />
        </div>
      </div>
    </div>
  );
};

export default AboutMoviePage;
