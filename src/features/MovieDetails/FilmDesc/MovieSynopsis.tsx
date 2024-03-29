const MovieSynopsis = ({ data }: any) => {
  return (
    <>
      <p className='mb-8' style={{ maxWidth: '800px' }}>
        {data.description}
      </p>
    </>
  );
};

export default MovieSynopsis;
