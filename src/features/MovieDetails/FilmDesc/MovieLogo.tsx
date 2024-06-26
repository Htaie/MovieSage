export const MovieLogo = ({ data }: any): JSX.Element => {
  return (
    <>
      {data.logo.url.length > 0 ? (
        <img src={data.logo.url} alt='film logo' className='h-10 w-[300px] mb-3 ' />
      ) : (
        <h1 className='text-4xl font-bold mt-4 mb-[40px]'>{data.name}</h1>
      )}
    </>
  );
};
