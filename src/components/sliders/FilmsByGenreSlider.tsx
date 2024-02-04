import { useEffect, useState } from 'react';
import { apiKey, apiUrl } from '../../constants';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

export const FilmByGenreSlider = ({ genre }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedfilmByGenresData = localStorage.getItem(`filmByGenresData_${genre}`);

    if (storedfilmByGenresData) {
      setData(JSON.parse(storedfilmByGenresData).docs);
    } else {
      const fetchData = async () => {
        try {
          const url = `${apiUrl}movie?page=1&limit=15&selectFields=id&selectFields=backdrop&notNullFields=backdrop.url&sortField=&sortType=1&type=${genre}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'X-API-KEY': apiKey,
            },
          });
          console.log('Response received:', response);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const responseData = await response.json();
          setData(responseData.docs);

          localStorage.setItem(`filmByGenresData_${genre}`, JSON.stringify(responseData));
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl text-white ml-12">{genre}</h1>

      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        slidesPerView={7}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
      >
        {Array.isArray(data) ? (
          data.map((item: any, index: number) => (
            <SwiperSlide key={index} className="flex">
              <Link to={`/movie/${item.id}`}>
                <img
                  src={item.backdrop.url}
                  alt="film image"
                  className="w-[200px] h-[200px] rounded-lg object-cover"
                ></img>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Swiper>
    </>
  );
};
