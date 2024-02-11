import { useParams } from 'react-router-dom';
import { MainBtn } from '../../components/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilmInfo from '../../components/MovieDetails/FilmInfo.tsx';
import ActorsInfo from '../../components/MovieDetails/ActorsInfo.tsx';
import { useEffect, useState } from 'react';
import { TOKEN, apiUrl } from '../../constants.ts';
import { CircularProgress } from '@mui/material';
import GenresCards from '../../GenresToDisplay/GenresCards/GenresCards.tsx';
import { RaitingInfo } from '../../components/MovieDetails/RatingStar.tsx';
import Navbar from '../../components/Navigation/Header/NavBar.tsx';
import Footer from '../../components/Navigation/Footer/Footer.tsx';
import TrailerModal from '../../components/MovieDetails/TrailerModal.tsx';
import CloseIcon from '@mui/icons-material/Close';
interface MovieType {
  logo: { url: string };
  id: number;
  type: string;
  name: string;
  rating: { imdb: number; kp: number };
  genres: { name: string }[];
  countries: { name: string }[];
  year: number;
  shortDescription: string;
  backdrop: { url: string };
  poster: { url: string };
  movieLength: number;
  description: string;
  videos: { trailers: { url: string }[] };
}

const AboutMoviePage = () => {
  const [data, setData] = useState<MovieType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiUrl}movie/${id}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-KEY': TOKEN,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);
  if (!data) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-black">
        <CircularProgress sx={{ color: 'white' }} />
      </div>
    );
  }
  if (openModal) {
    document.body.style.overflow = 'hidden';
    scrollTo(0, 0);
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div className="bg-black">
      <Navbar />
      <div className="container mx-auto text-white pt-[100px] pb-[100px]">
        {openModal && (
          <div className="w-full h-full absolute overflow-hidden ">
            <div className=" bg-black opacity-75 absolute z-40  w-full h-full" onClick={() => setOpenModal(false)}>
              <CloseIcon
                onClick={() => setOpenModal(false)}
                className="text-white absolute right-3 top-3 cursor-pointer"
                style={{ fontSize: '50px' }}
              />
            </div>
            <div className="absolute top-1/2 left-1/2  z-50 transform -translate-x-1/2 -translate-y-1/2">
              <TrailerModal trailer={data.videos.trailers[0].url} />
            </div>
          </div>
        )}
        <div className="container mx-auto text-white">
          <div className=" flex">
            <div>
              <img
                src={data.poster.url || 'https://placehold.co/300x430'}
                alt="film image"
                className="w-[300px] h-[430px] rounded-lg mt-4 mb-4"
              ></img>
            </div>
            <div className="flex flex-col ml-[50px] mt-4">
              {data.logo.url ? (
                <img src={data.logo.url} alt="film logo" className="h-10 w-[300px] mb-3 " />
              ) : (
                <h1 className="text-4xl font-bold mt-4 mb-[40px]">{data.name}</h1>
              )}
              <div className="flex mb-8">
                <GenresCards data={data.genres} width={30} />
              </div>
              <div className="flex mb-4">
                <p>{data.year}</p>
                <div className="flex">
                  {data.countries.map((item, index) => (
                    <p key={index} className="mr-2">
                      {item.name}
                    </p>
                  ))}
                </div>
                <p>{data.movieLength} мин</p>
              </div>
              <p className="mb-8" style={{ maxWidth: '800px' }}>
                {data.description}
              </p>
              <div className="mb-6">
                <MainBtn
                  text="Посмотреть трейлер"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                ></MainBtn>
                <MainBtn
                  text="Посмотреть фильм"
                  to={`/watch/${data.id}`}
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
            </div>
          </div>
          <RaitingInfo data={data} />
          <div className="mb-[80px]">
            <p className="font-bold text-3xl mb-[60px]">Актеры:</p>
            <ActorsInfo data={data} />
          </div>
          <FilmInfo data={data} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutMoviePage;
