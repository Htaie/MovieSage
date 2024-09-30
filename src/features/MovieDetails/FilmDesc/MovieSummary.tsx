export const MovieSummary = ({ data }: any): JSX.Element => {
  return (
    <div className='flex mb-4'>
      <p className='mr-2'>{data.year}</p>
      <div className='flex'>
        {data.countries.map((item, index) => (
          <p key={index} className='mr-2'>
            {item.name}
          </p>
        ))}
      </div>
      <p>{data.movieLength} мин</p>
    </div>
  );
};
