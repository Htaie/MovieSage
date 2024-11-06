import { useParams } from 'react-router-dom';
import { MainBtn } from '../../shared/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState,  useEffect } from 'react';
import TrailerModal from '../../features/MovieDetails/TrailerModal.tsx';
import CloseIcon from '@mui/icons-material/Close';
import TheatersIcon from '@mui/icons-material/Theaters';

import MainLoader from '../../shared/loader/MainLoader.tsx';
import MovieDescription from '../../widgets/MovieDescription/MovieDescription.tsx';
import ActorsInMovie from '../../widgets/MovieDescription/ActorsInMovie.tsx';
import FilmInfo from '../../features/MovieDetails/FilmDesc/FilmInfo.tsx';
import { MovieDataFetcher, movieDataStore } from '../../entities/MovieDataFetcher/MovieDataFetcher.tsx';
import { useStore } from 'effector-react';
import axios from 'axios';
import { CircularProgress, Skeleton } from '@mui/material';



const AboutMoviePage = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const [torrentsList, setTorrentsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams() as any
  
  useEffect(() => {
    MovieDataFetcher(id).then(res => {
      fetchTorrents(res.name)
    })
  }, [id]); 
  
  const data = useStore(movieDataStore);
  const fetchTorrents = async (name : string) => {
        setLoading(true);

    axios.get(`http://localhost:3000/getTorrents/?title=${name}`).then((response) => {
      setLoading(false);
      setTorrentsList(response.data);
    });
  }

  interface Torrent {
    id: string
    name: string
    poster: string
    seriesLength: number
    rating: number
  }

  const handleClickTorrent = (idTorrent : string, data : any) => {
    const {id, name, poster, seriesLength, rating} = data as Torrent
    const MovieInfo = { id, name, poster, seriesLength, rating };
    axios.post(`http://localhost:3000/addTorrent/?id=${idTorrent}`, MovieInfo)
    .then((response) => {
      console.log(response)
    });
  }

  const TorrentsList = () => {

    return loading ? (
      <>
        <Skeleton variant='text' sx={{ bgcolor: 'grey.700' }} width={'97%'} height={40} />
        <Skeleton variant='text' sx={{ bgcolor: 'grey.700' }} width={'97%'} height={40} />
        <Skeleton variant='text' sx={{ bgcolor: 'grey.700' }} width={'97%'} height={40} />
      </>
    ) : (
      <>
        {torrentsList.map((item: { Name: string; Size: string, Id: string }, index) => (
          <div
            key={index}
            className=' w-[97%] mb-3  bg-[#333333] text-gray-700  border border-gray-700 rounded-lg dark:border-gray-600 dark:text-white'
          >
            <button
            onClick={() => {
              handleClickTorrent(item.Id, data )
            }}
              type='button'
              className='relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100  focus:z-10 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white'
            >
              <TheatersIcon className='mr-2' />
              {item.Name} | {item.Size}
            </button>
          </div>
        ))}
      </>
    );}

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
    <div className='bg-[#212124]'>
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
                  text='Посмотреть торенты'
                  onClick={() => {
                    // fetchData();
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
        <div className='flex flex-col   max-h-96 overflow-auto'>
          <h1 className='text-3xl font-bold my-4'>Торренты</h1>
                  <TorrentsList />

        </div>
        <div className='mb-[80px] my-4 '>
          <ActorsInMovie data={data} />
        </div>
      </div>
    </div>
  );
};

export default AboutMoviePage;
