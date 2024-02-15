import { useParams } from 'react-router-dom';
import { MainBtn } from '../../components/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilmInfo from '../../components/MovieDetails/FilmInfo.tsx';
import ActorsInfo from '../../components/MovieDetails/ActorsInfo.tsx';
import { useEffect, useState, useRef } from 'react';
import { TOKEN, apiUrl } from '../../constants.ts';
import { CircularProgress } from '@mui/material';
import GenresCards from '../../GenresToDisplay/GenresCards/GenresCards.tsx';
import { RaitingInfo } from '../../components/MovieDetails/RatingStar.tsx';
import TrailerModal from '../../components/MovieDetails/TrailerModal.tsx';
import CloseIcon from '@mui/icons-material/Close';
import MoviePlaeer from '../../components/UI/MoviePlayer.tsx';
import { MovieType } from '../../types.ts';

const AboutMoviePage = (): JSX.Element => {
  const [data, setData] = useState<MovieType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const watchFilmRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const url = `${apiUrl}movie/${id}`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-KEY': TOKEN
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const responseData = await response.json()
        setData(responseData as MovieType | null)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }

    void fetchData()
  }, [])
  if (data == null) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black">
        <CircularProgress sx={{ color: 'white' }} />
      </div>
    )
  }
  if (openModal) {
    document.body.style.overflow = 'hidden'
    scrollTo(0, 0)
  } else {
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="bg-black">
      <div className="container mx-auto text-white pt-[100px] pb-[100px]">
        {openModal && (
          <div className="w-full h-full absolute overflow-hidden">
            <div className=" bg-black opacity-75 absolute z-40  w-full h-full" onClick={() => { setOpenModal(false); }}>
              <CloseIcon
                onClick={() => { setOpenModal(false) }}
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
                src={(data.poster.url.length > 0) ? data.poster.url : 'https://placehold.co/300x430'}
                alt='film image'
                className='w-[300px] h-[430px] rounded-lg mt-4 mb-4'
              ></img>
            </div>
            <div className='flex flex-col ml-[50px] mt-4'>
              {(data.logo.url.length > 0)
                ? (
                <img src={data.logo.url} alt='film logo' className='h-10 w-[300px] mb-3 ' />
                  )
                : (
                <h1 className='text-4xl font-bold mt-4 mb-[40px]'>{data.name}</h1>
                  )}
              <div className='flex mb-8'>
                <GenresCards data={data.genres} width={30} />
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
              <p className='mb-8' style={{ maxWidth: '800px' }}>
                {data.description}
              </p>
              <div className='mb-6'>
                <MainBtn
                  text='Посмотреть трейлер'
                  onClick={() => {
                    setOpenModal(true)
                  }}
                ></MainBtn>
                <MainBtn
                  text="Посмотреть фильм"
                  // to={`/watch/${data.id}`}
                  onClick={() => {
                    watchFilmRef?.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                ></MainBtn>
                <MainBtn
                  text={<MoreHorizIcon />}
                  to={''}
                  onClick={() => {
                    console.log('Click')
                  }}
                ></MainBtn>
              </div>
            </div>
          </div>
          <RaitingInfo data={data} />
          <div className='mb-[80px]'>
            <p className='font-bold text-3xl mb-[60px]'>Актеры:</p>
            <ActorsInfo data={data} />
          </div>
          <div className="mb-[80px]">
            <FilmInfo data={data} />
          </div>
        </div>
        <div className="mb-[80px]" ref={watchFilmRef}>
          {/* XDD */}
          <p className="font-bold text-3xl mb-[60px]">Смотреть фильм {data.name} онлайн без регистрации и СМС:</p>
          <MoviePlaeer id={data.id} />
        </div>
      </div>
    </div>
  )
}

export default AboutMoviePage
