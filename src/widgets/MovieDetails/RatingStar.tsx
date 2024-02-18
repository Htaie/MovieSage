import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { MainBtn } from '../../shared/UI/buttons/MainBtn'
import { RatingRounding } from '../../app/utils/textUtils'
import { MovieType } from '../../app/types/MoviesTypes'

interface RaitingInfoProps {
  data: MovieType
}

export const RaitingInfo = ({ data }: RaitingInfoProps): JSX.Element => {
  const stars = Array.from({ length: 10 }, (_, index) => (
    <StarOutlinedIcon key={index} style={{ fontSize: '3em', color: '#a0a0a0' }} />
  ))

  const ratingScore = RatingRounding(data.rating.kp, 1)

  return (
    <>
      <div className='mt-[60px] mb-[180px]'>
        <p className='font-bold text-4xl mb-[70px]'>Рейтинг фильма:</p>
        <div className='grid grid-cols-[1fr,2fr]'>
          <div className='flex flex-row items-center'>
            {stars.map((_, index) => {
              const rating = index + 1
              const starColor = rating <= ratingScore ? '#ffffff' : '#a0a0a0'

              return (
                <div key={index} className='flex flex-col items-center'>
                  <StarOutlinedIcon style={{ fontSize: '3em', color: starColor }} />
                  <span>{rating}</span>
                </div>
              )
            })}
          </div>
          <div className='flex justify-between'>
            <p className='font-bold text-5xl'>{ratingScore}</p>
            <MainBtn
              text={'Оценить фильм'}
              onClick={() => {
                console.log('Liked')
              }}
              style={{ marginBottom: '20px' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
