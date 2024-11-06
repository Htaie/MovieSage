import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { sequelsAndPrequels } from '../../../shared/types/MoviesTypes';
import { Navigation } from 'swiper/modules';
import MovieCard from '../../MovieCard';

interface MovieSimilarListProps {
  data: sequelsAndPrequels[];
}

export const MovieSimilarList = ({ data }: MovieSimilarListProps) => {
  console.log(data);
  return (
    <div>
      <Swiper
        slidesPerView={7}
        loop={false}
        navigation={true}
        modules={[Navigation]}
        className='swiper-navigation-color'
      >
        {data.map((item: sequelsAndPrequels, index: number) => (
          <SwiperSlide key={index}>
            {item.rating?.imdb !== undefined && (
              <MovieCard id={item.id} poster={item.poster.url} name={item.name} rating={item.rating.imdb} />
            )}
            {item.rating === undefined && <MovieCard id={item.id} poster={item.poster.url} name={item.name} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
