import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import { MovieType } from '../../../shared/types/MoviesTypes';
import { useMobile } from '../../../shared/hooks/useMobile';
interface ActorsProps {
  data: MovieType;
}
const ActorsInfo = ({ data }: ActorsProps): JSX.Element => {
  const isMobile = useMobile();
  return (
    <>
      <Swiper
        slidesPerView={isMobile ? 3 : 6}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className='swiper-navigation-color'
      >
        {data.persons.map((item: any, index: number) => (
          <SwiperSlide key={index} className='flex'>
            <Link key={index} to={`/actor/${item.id}`}>
              <img
                src={item.photo}
                alt='actor image'
                className='w-[120px] h-[120px] md:w-[200px] md:h-[200px] rounded-lg object-cover mb-2'
              ></img>
              <p className='ml-1'>{item.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ActorsInfo;
