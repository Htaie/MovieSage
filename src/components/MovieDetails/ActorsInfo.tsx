import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const ActorsInfo = ({ data }: any) => {
  console.log(data);
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        slidesPerView={6}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
      >
        {data.persons.map((item: any, index: number) => (
          <SwiperSlide key={index} className="flex">
            <Link key={index} to={`/actor/${item.id}`}>
              <img src={item.photo} alt="actor image" className="w-[200px] h-[200px] rounded-lg object-cover"></img>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ActorsInfo;
