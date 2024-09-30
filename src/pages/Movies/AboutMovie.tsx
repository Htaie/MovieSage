import { useParams } from 'react-router-dom';
import { MainBtn } from '../../shared/UI/buttons/MainBtn.tsx';
import { useState, useRef, useEffect } from 'react';
import TrailerModal from '../../features/MovieDetails/TrailerModal.tsx';
import CloseIcon from '@mui/icons-material/Close';
import MainLoader from '../../shared/loader/MainLoader.tsx';
import MovieDescription from '../../widgets/MovieDescription/MovieDescription.tsx';
import { RaitingInfo } from '../../features/MovieDetails/RatingStar.tsx';
import ActorsInMovie from '../../widgets/MovieDescription/ActorsInMovie.tsx';
import { MovieDataFetcher, movieDataStore } from '../../entities/MovieDataFetcher/MovieDataFetcher.tsx';
import { useStore } from 'effector-react';

const AboutMoviePage = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const [torrentsList, setTorrentsList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    MovieDataFetcher(id);
  }, [id]); //у меня ощущения будто это не совсем то что нужно но если честно то я вообще чет не смог ничего больше сделать рабочего с этим вонючим effector'ом

  const data = useStore(movieDataStore);
  const watchFilmRef = useRef<null | HTMLDivElement>(null);

  if (data == null) {
    return <MainLoader />;
  }
  if (openModal) {
    document.body.style.overflow = 'hidden';
    scrollTo(0, 0);
  } else {
    document.body.style.overflow = 'auto';
  }
  const test = {
    query: data.name,
    trackers: [],
    order_by: 'd',
    filter_by_size: '',
    limit: 20,
    offset: 0,
    full_match: false,
    token: '5B3VFEYUUE54ULNMSENPGSVVS7OPD57OZUK2KLFMLSLвы6UKAQ',
  };

  async function fetchData() {
    try {
      const response = await fetch('https://api.exfreedomist.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setTorrentsList(result.data);

      console.log(result.data);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  async function addTorrent(magnetLink) {
    console.log(magnetLink, 'dddd');
    const data = new URLSearchParams();
    data.append('link', magnetLink);
    await fetch('http://localhost:3000/addMagnetLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    }).then((response) => {
      console.log(response);
    });
  }

  async function fetchMagnet(key) {
    try {
      let lol = null;
      const response = await fetch(`https://api.exfreedomist.com/magnet/${key}?token=fggfgfgf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log(response);
      const result = await response.json(); // Парсим ответ как JSON
      // setTorrentsList(result);
      const magnetLink = result.data.magnet_link.match(/magnet(\S+)/i);
      if (magnetLink && magnetLink[1]) {
        const result = magnetLink[1].trim();
        lol = 'magnet' + result;
      } else {
        console.log('Магнет-ссылка не найдена');
      }

      addTorrent(lol);
      console.log(lol); // Выводим результат в консоль
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
  const cleanTitle = (title) => {
    return title
      .replace(/(I need money:.+|demo version.+|use token.+|https?:\/\/\S+)/gi, '') // удаляем лишние фразы и ссылки
      .replace(/(\[.+?\])/g, '') // удаляем текст в квадратных скобках
      .replace(/\/{2,}/g, '') // удаляем двойные косые черты
      .replace(/[^\w\sА-Яа-яёЁ.,:;()!?]+/gi, '') // убираем ненужные спецсимволы
      .replace(/\s+/g, ' ') // заменяем множественные пробелы одним
      .trim(); // удаляем пробелы по краям
  };
  const parseSize = (sizeString) => {
    const match = sizeString.match(/(\d+\.?\d*)\s*([GM]B)/i);

    if (match) {
      const sizeValue = parseFloat(match[1]);
      const sizeUnit = match[2].toUpperCase();

      return `${sizeValue} ${sizeUnit}`;
    }
    return sizeString;
  };
  return (
    <div className='bg-[#212124]'>
      <div className='container mx-auto text-white md:pt-[100px] pb-[20px] md:pb-[100px] px-[10px]'>
        {openModal && (
          <div className='w-full h-full absolute overflow-hidden'>
            <div
              className=' bg-black opacity-75 absolute z-40  w-full h-full'
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <CloseIcon
                onClick={() => {
                  setOpenModal(false);
                }}
                className='text-white absolute right-3 top-3 cursor-pointer'
                style={{ fontSize: '50px' }}
              />
            </div>
            <div className='absolute top-1/2 left-1/2  z-50 transform -translate-x-1/2 -translate-y-1/2'>
              <TrailerModal trailer={data.videos.trailers[0].url} />
            </div>
          </div>
        )}
        <div className='container mx-auto text-white'>
          <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr]'>
            <div className='flex w-full'>
              <img
                src={data.poster.url.length > 0 ? data.poster.url : 'https://placehold.co/300x430'}
                alt='film image'
                className='w-full h-full md:w-[300px] md:h-[430px] rounded-lg mt-4 mb-4'
              ></img>
            </div>
            <div className='flex flex-col md:w-[500px] lg:w-[600px] xl:w-[800px] mt-4'>
              <MovieDescription data={data} />
              <div className='flex flex-wrap gap-4 mb-6'>
                <MainBtn
                  text='Посмотреть трейлер'
                  onClick={() => {
                    setOpenModal(true);
                  }}
                ></MainBtn>
                <MainBtn
                  text='Посмотреть торенты'
                  onClick={() => {
                    fetchData();
                  }}
                ></MainBtn>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          {torrentsList.length > 0 &&
            torrentsList.map((item, index) => (
              <MainBtn
                key={index}
                text={cleanTitle(item.title)}
                size={parseSize(item.size)}
                onClick={() => fetchMagnet(item.magnet_key)}
              />
            ))}
        </div>
        <div className='px-[10px]'>
          <RaitingInfo data={data} />
          <ActorsInMovie data={data} />
        </div>
      </div>
    </div>
  );
};

export default AboutMoviePage;
