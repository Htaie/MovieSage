import { Link } from 'react-router-dom';
import { MainBtn } from '../../shared/UI/buttons/MainBtn';
import MovieCard from '../../features/MovieCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { MovieType } from '../../shared/types/MoviesTypes';
import MainLoader from '../../shared/loader/MainLoader';
import { FormatingName } from '../../shared/utils/textUtils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const MovieSlider = ({ data, title }: { data: MovieType[]; title: string }) => {
  return (
    <>
      <div className='flex w-full items-center justify-between'>
        <Link to={`/genre/${title}`} className='flex items-center ml-2 my-10'>
          <h1 className='text-3xl text-white mr-2'>{FormatingName(title)}</h1>
          <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '24px', marginTop: '5px' }} />
        </Link>
      </div>
      <Swiper
        style={{
          width: '100%',
        }}
        slidesPerView={'auto'}
        spaceBetween={13}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className='swiper-navigation-color '
        modules={[Navigation]}
      >
        {Array.isArray(data) ? (
          data.map((item: MovieType, index: number) => (
            <SwiperSlide style={{ height: '400px', width: '200px' }} key={index} className='flex items-center'>
              <MovieCard
                id={item.id}
                poster={item.poster.url}
                rating={item.rating.imdb}
                name={item.name}
                seriesLength={item.seriesLength}
              />
            </SwiperSlide>
          ))
        ) : (
          <MainLoader />
        )}
      </Swiper>
    </>
  );
};

export default MovieSlider;
