import { Link } from 'react-router-dom'
import { FormatingName, getEmojiForGenre } from '../../shared/utils/textUtils'
import { MovieType } from '../../shared/types/MoviesTypes'
interface Props {
  genres: MovieType['genres']
  data: MovieType
}

const GenreLink = (data: Props): JSX.Element => {
  return (
    <>
      {data.genres.map((item) => (
        <Link
          key={item.name}
          className={'backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30  px-3 py-2  rounded-3xl text-xl mx-2 my-2'}
          to={`/genre/${item.name}`}
        >
          <span>
            {getEmojiForGenre(item.name)} {FormatingName(item.name)}
          </span>
        </Link>
      ))}
    </>
  )
}

export default GenreLink
