import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { RatingScore } from '../../../textUtils';

const MovieCards = ({ data }: any) => {
  if (data.length === 0 || !data) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-black">
        <CircularProgress sx={{ color: 'white' }} />
      </div>
    );
  }

  const boxShadowStyle = {
    WebkitBoxShadow: '0px -82px 65px -15px rgba(6, 6, 6, 0.33) inset',
    MozBoxShadow: '0px -82px 65px -15px rgba(6, 6, 6, 0.33) inset',
    boxShadow: '0px -82px 65px -15px rgba(6, 6, 6, 0.33) inset',
  };

  return (
    <>
      {data.map((item: any, idx: number) => (
        <Link
          to={`/movie/${item.id}`}
          className="relative w-[266px] h-[400px] rounded-lg overflow-hidden transition-transform  transform hover:scale-105 mb-4 text-white"
          key={idx}
        >
          <img src={item.poster.url || 'https://placehold.co/244x400'} alt="movies image" className="w-full h-full" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4" style={boxShadowStyle}>
            <h1
              className=" w-14 text-xl text-center  backdrop-blur-sm  px-3  py-2  rounded-2xl"
              style={{ backgroundColor: RatingScore(item.rating.imdb) }}
            >
              {item.rating.imdb}
            </h1>
            <h1 className="text-xl font-bold">{item.name}</h1>
          </div>
        </Link>
      ))}
    </>
  );
};

export default MovieCards;
