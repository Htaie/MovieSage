import { useParams } from 'react-router-dom';
import { MainBtn } from '../components/UI/buttons/MainBtn.tsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FilmInfo from '../components/MovieDetails/FilmInfo.tsx';
import ActorsInfo from '../components/MovieDetails/ActorsInfo.tsx';
import { useEffect, useState } from 'react';
import { apiKey, apiUrl } from '../constants.ts';
import { CircularProgress } from '@mui/material';
import GenresCards from '../components/cards/GenresCards.tsx';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

const AboutMoviePage = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${apiUrl}movie/${id}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-KEY': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);
  if (data.length === 0 || !data) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-black">
        <CircularProgress sx={{ color: 'white' }} />
      </div>
    );
  }

  console.log(id);

  const stars = Array.from({ length: 10 }, (_, index) => (
    <StarOutlinedIcon key={index} style={{ fontSize: '3em', color: '#a0a0a0' }} />
  ));

  return (
    <div className="bg-black">
      <div className="container mx-auto text-white">
        <div className=" flex">
          <div>
            <img
              src={data.poster.url || 'https://placehold.co/300x430'}
              alt="film image"
              className="w-[300px] h-[430px] rounded-lg mt-4 mb-4"
            ></img>
            {/* <iframe width="300" height="170" src={data.videos.trailers[0].url}></iframe> */}
          </div>
          <div className="flex flex-col ml-[50px]">
            <div className="flex mb-8">
              <GenresCards data={data.genres} width={30} />
            </div>
            <h1 className="text-4xl font-bold mt-4 mb-[40px]">{data.name}</h1>
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
                to={''}
                onClick={() => {
                  console.log('Click');
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
        <div className="mt-[60px] mb-[180px]">
          <p className="font-bold text-4xl mb-[70px]">Рейтинг фильма:</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row items-center">
              {stars.map((_, index) => {
                const rating = index + 1;
                const starColor = rating <= data.rating.kp ? '#ffffff' : '#a0a0a0';

                return (
                  <div key={index} className="flex flex-col items-center">
                    <StarOutlinedIcon style={{ fontSize: '3em', color: starColor }} />
                    <span>{rating}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-end">
              <p className="font-bold text-3xl">{data.rating.kp}</p>
              <MainBtn
                text={'Оценить фильм'}
                onClick={() => {
                  console.log('Liked');
                }}
                style={{ marginBottom: '20px' }}
              />
            </div>
          </div>
        </div>
        <div className="mb-[80px]">
          <p className="font-bold text-3xl mb-[60px]">Актеры:</p>
          <ActorsInfo data={data} />
        </div>
        <FilmInfo data={data} />
      </div>
    </div>
  );
};

export default AboutMoviePage;
