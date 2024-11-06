import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

export const MovieSummary = ({ data }: any): JSX.Element => {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4'>{data.name}</h1>
      <div className='flex mb-4 gap-2'>
        <p>{data.year}</p>
        <div className='flex gap-2'>
          {data.countries.map(
            (
              item: {
                name:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined;
              },
              index: Key | null | undefined
            ) => (
              <p key={index}>{item.name}</p>
            )
          )}
        </div>
        <p>{data.movieLength} мин</p>
      </div>
    </div>
  );
};
