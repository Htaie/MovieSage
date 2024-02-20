import { useParams } from 'react-router-dom';
import { API_URL, TOKEN } from '../../shared/constants/constants';
import { useEffect, useState } from 'react';
import MovieCards from '../../widgets/MoviesToDisplay/MoviesCards/MoviesCards';
import { FormatingName } from '../../shared/utils/textUtils';
import { CircularProgress } from '@mui/material';

const MoviesList = (): JSX.Element => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true)

        const url = `${API_URL}movie?page=${pageNumber}&limit=50&genres.name=${name}&notNullFields=poster.url`
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-KEY': TOKEN
          }
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const responseData = await response.json()
        setData((prevData): any => [...prevData, ...responseData.docs])
        setMaxPages(responseData.pages )
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [pageNumber, name])
  useEffect(() => {
    const handleScroll = (): void => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop =
        (window.scrollY !== 0) || (window.scrollY !== 0) || document.body.scrollTop + ((document.documentElement.scrollTop !== 0) || 0)

      if (!loading && windowHeight + scrollTop >= documentHeight - 400 && pageNumber < maxPages) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pageNumber, name, maxPages, loading])

  return (
    <>
      <div className="bg-black h-full min-h-screen ">
        <h1 className="text-white text-3xl mb-10 pt-36 ml-20 ">{FormatingName(name)}</h1>
        <div className="absolute right-0"></div>
        <div className="container mx-auto my-0 flex flex-wrap justify-between">
          <MovieCards data={data} />
        </div>
        <div className="flex justify-center">
          {loading && pageNumber > 1 && (
            <div className="w-full h-full flex justify-center items-center bg-black">
              <CircularProgress sx={{ color: 'white' }} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MoviesList
