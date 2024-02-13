import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TOKEN, apiUrl } from '../../constants.ts';
import moment from 'moment';
import 'moment/dist/locale/ru';
export const AboutActorPage = () => {
  moment.locale('ru');
  const [actorData, setActorData] = useState<any>(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchActor = async () => {
      try {
        const response = await fetch(`${apiUrl}person/${id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-KEY': TOKEN,
          },
        });
        const data = await response.json();
        setActorData(data);
        console.log(data);
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    };
    fetchActor();
  }, []);
  return (
    <div className="bg-black text-white w-full h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,2fr] container mx-auto md:grid-cols-[2fr,1fr] sm:grid-cols-[2fr,1fr] pt-40 pb-40">
        <div>
          <img
            src={actorData?.photo || 'https://placehold.co/400x550'}
            alt="actor image"
            className="rounded-lg ml-12 h-[400px]"
          ></img>
        </div>
        <div>
          <div className="mb-8">
            {actorData?.name && <p className="text-3xl">{actorData?.name}</p>}
            {actorData?.enName && <p className="text-xl">{actorData?.enName}</p>}
          </div>
          <div className="grid grid-cols-1 gap-y-2 md:grid-cols-[1fr,2fr]">
            {actorData?.profession?.length && (
              <div className="flex flex-col">
                <p className="text-gray-400 text-xl">Карьера:</p>
                <p className="text-xl">
                  {actorData?.profession.map((e: { value: string }, i: number) => (
                    <span key={i}>
                      {e.value}
                      {i !== actorData.profession.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              </div>
            )}
            {actorData?.birthday && (
              <div>
                <p className="text-gray-400 text-xl">Дата рождения:</p>
                <p className="text-xl">{moment(actorData?.birthday).format('LL')}</p>
              </div>
            )}
            {actorData?.growth && (
              <div>
                <p className="text-gray-400 text-xl">Рост:</p>
                <p className="text-xl">{actorData?.growth / 100} м</p>
              </div>
            )}
            {actorData?.death && (
              <div>
                <p className="text-gray-400 text-xl">Дата смерти:</p>
                <p className="text-xl">{moment(actorData?.death).format('LL')}</p>
              </div>
            )}
            {actorData?.birthPlace && (
              <div>
                <p className="text-gray-400 text-xl">Место рождения:</p>
                <p className="text-xl">
                  {actorData?.birthPlace.map((e: { value: string }, i: number) => (
                    <span key={i}>
                      {e.value}
                      {i + 1 !== actorData.birthPlace.length && ', '}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
