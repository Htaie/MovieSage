import { Link } from 'react-router-dom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { FormatingName } from '../../shared/utils/textUtils';
import { GENRES } from '../../shared/constants/constants';

const GenreLinkSlider = (): JSX.Element => {  
  return (
    <>
      {Object.keys(GENRES)
        .slice(0, 8)
        .map((key) => (
          <Link
            to={`/genre/${GENRES[key]}`}
            className={`flex mb-3 ${location.pathname == `/genre/${encodeURIComponent(GENRES[key])}` ? 'border-r-2' : ''}`}
          >
            <span className='text-xl text-[#888888]'>{FormatingName(GENRES[key])}</span>
          </Link>
        ))}
    </>
  );
};

export default GenreLinkSlider;
