import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'

import { MovieType } from '../../app/types/MoviesTypes'
interface ActorsProps {
  data: MovieType
}
const ActorsInfo = ({ data }: ActorsProps): JSX.Element => {
  console.log(data)
  return (
    <>
      <Swiper
        slidesPerView={6}
        loop={true}
        pagination={{
          clickable: true
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
                alt="actor image"
                className="w-[200px] h-[200px] rounded-lg object-cover mb-2"
              ></img>
              <p className="ml-1">{item.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default ActorsInfo
