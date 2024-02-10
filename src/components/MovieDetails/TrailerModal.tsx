const TrailerModal = ({ trailer }: { trailer: any }) => {
  console.log(trailer);
  return (
    <div style={{ textAlign: '-webkit-center' }}>
      <iframe width="1200" height="800" src={trailer}></iframe>
    </div>
  );
};

export default TrailerModal;
