import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { FormatingName, getEmojiForGenre } from '../../shared/utils/textUtils';
import { Navigation } from 'swiper/modules';

const GenreLinkSlider = ({ genre, isMobile }: { genre: Record<string, string>; isMobile: boolean }): JSX.Element => {
  return (
    <>
      <Swiper
        slidesPerView={isMobile ? 3 : 5}
        slidesPerGroup={isMobile ? 3 : 5}
        spaceBetween={isMobile ? 5 : 30}
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
            className='backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30 py-2 md:py-4 px-5 rounded-2xl text-xl w-full my-4 md:mx-2 md:my-12'
          >
            <Link to={`/genre/${genre[key]}`} className='text-center flex justify-center items-center'>
              <span className='text-[18px] md:text-[23px] mr-2'>{getEmojiForGenre(genre[key])}</span>
              <span className='text-xs'>{FormatingName(genre[key])}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default GenreLinkSlider;
