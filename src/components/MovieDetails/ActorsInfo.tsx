import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const ActorsInfo = ({ data }) => {
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
        {data.persons.map((item, index) => (
          <SwiperSlide key={index} className="flex">
            <Link key={index} to={`/actor/${item.id}`}>
              <img src={item.photo} alt="actor image" className="w-[190px] h-[200px] rounded-lg"></img>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ActorsInfo;
