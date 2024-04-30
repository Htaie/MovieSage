import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { FormatingName, getEmojiForGenre } from '../../shared/utils/textUtils';
import { Navigation } from 'swiper/modules';
const GenreLinkSlider = ({ genre }: { genre: Record<string, string> }): JSX.Element => {
  return (
    <>
      <Swiper
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className='text-white swiper-navigation-color'
      >
        {Object.keys(genre).map((key) => (
          <SwiperSlide
            key={key}
            className='backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl  hover:bg-white/30  py-4 px-10  rounded-2xl text-xl w-full mx-2 my-12 '
          >
            <Link to={`/genre/${genre[key]}`} className=' text-center flex text-[14px] justify-center'>
              <span className='text-[23px] mr-2'>{getEmojiForGenre(genre[key])}</span>
              <span>{FormatingName(genre[key])}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default GenreLinkSlider;
