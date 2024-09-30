import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { RatingRounding } from '../../shared/utils/textUtils';
import { MovieType } from '../../shared/types/MoviesTypes';
import { useMobile } from '../../shared/hooks/useMobile';
interface RaitingInfoProps {
  data: MovieType;
}

export const RaitingInfo = ({ data }: RaitingInfoProps): JSX.Element => {
  const stars = Array.from({ length: 10 }, (_, index) => (
    <StarOutlinedIcon key={index} style={{ fontSize: '3em', color: '#a0a0a0' }} />
  ));
  const isMobile = useMobile();

  const ratingScore = RatingRounding(data.rating.kp, 1);

  return (
    <>
      <div className='mt-[60px] mb-[40px] md:mb-[80px]'>
        <p className='font-bold text-4xl mb-[20px] md:mb-[30px]'>Рейтинг фильма:</p>
        <div className='grid grid-cols-[1fr,2fr]'>
          <div className='flex flex-row items-center'>
            {stars.map((_, index) => {
              const rating = index + 1;
              const starColor = rating <= ratingScore ? '#ffffff' : '#a0a0a0';

              return (
                <div key={index} className='flex flex-col items-center'>
                  <StarOutlinedIcon
                    style={{ fontSize: isMobile ? '2em' : '3em', color: starColor }}
                    className='hover:cursor-pointer hover:scale-110'
                  />
                  <span>{rating}</span>
                </div>
              );
            })}
          </div>
          <div className='flex justify-between'>
            <p className='font-bold ml-[10px] text-2xl md:text-5xl'>{ratingScore}</p>
          </div>
        </div>
      </div>
    </>
  );
};
