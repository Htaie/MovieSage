import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

export const MovieSummary = ({ data }: any): JSX.Element => {
  return (
    <div className='flex mb-4'>
      <p>{data.year}</p>
      <div className='flex'>
        {data.countries.map((item: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
          <p key={index} className='mr-2'>
            {item.name}
          </p>
        ))}
      </div>
      <p>{data.movieLength} мин</p>
    </div>
  );
};
