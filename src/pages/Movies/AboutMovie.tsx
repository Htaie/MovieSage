import { useParams } from 'react-router-dom';
import { MainBtn } from '../../shared/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState, useEffect } from 'react';
import TrailerModal from '../../features/MovieDetails/TrailerModal.tsx';
import CloseIcon from '@mui/icons-material/Close';
import MainLoader from '../../shared/loader/MainLoader.tsx';
import MovieDescription from '../../widgets/MovieDescription/MovieDescription.tsx';
import ActorsInMovie from '../../widgets/MovieDescription/ActorsInMovie.tsx';
import { MovieDataFetcher, movieDataStore } from '../../entities/MovieDataFetcher/MovieDataFetcher.tsx';
import { useStore } from 'effector-react';
import axios from 'axios';
import { MovieSimilarList } from '../../features/MovieDetails/FilmDesc/MovieSimilarList.tsx';

const AboutMoviePage = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const [torrentsList, setTorrentsList] = useState([]);

  const { id } = useParams() as any;

  console.log(id);
  useEffect(() => {
    MovieDataFetcher(id).then((res) => {
      console.log(res);
      fetchTorrents(res.name);
    });
  }, [id]); //у меня ощущения будто это не совсем то что нужно но если честно то я вообще чет не смог ничего больше сделать рабочего с этим вонючим effector'ом

  const data = useStore(movieDataStore);
  const fetchTorrents = async (name: string) => {
    console.log(name);

    axios.get(`http://localhost:3000/getTorrents/?title=${name}`).then((response) => {
      console.log(response.data);
    });
  };

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
    <div>
      <div className='container text-white pt-[12px]'>
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
        <div className='container mx-auto text-white mb-10'>
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
                  text='Посмотреть торенты'
                  onClick={() => {
                    fetchData();
                  }}
                ></MainBtn>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          {/* {torrentsList.length > 0 &&
            torrentsList.map((item, index) => (
              <MainBtn
                key={index}
                text={cleanTitle(item.title)} 
                size={parseSize(item.size)}
                onClick={() => fetchMagnet(item.magnet_key)}
              />
            ))} */}
        </div>
        <div className='flex flex-col gap-12'>
          <ActorsInMovie data={data} />
          {data.sequelsAndPrequels?.length > 0 && (
            <div className='flex flex-col'>
              <h1 className='font-bold text-3xl mb-[20px]'>Сиквелы, приквелы:</h1>
              <MovieSimilarList data={data.sequelsAndPrequels} />
            </div>
          )}
          {data.similarMovies?.length > 0 && (
            <div className='flex flex-col'>
              <h1 className='font-bold text-3xl mb-[20px]'>Вам может понравится:</h1>
              <MovieSimilarList data={data.similarMovies} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMoviePage;
