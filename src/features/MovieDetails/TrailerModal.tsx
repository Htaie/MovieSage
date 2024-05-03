const TrailerModal = ({ trailer }: { trailer: any }): JSX.Element => {
  return (
    <div style={{ textAlign: 'center' }}>
      <iframe width='1200' height='600' src={`${trailer}?autoplay=1`} allow='autoplay'></iframe>
    </div>
  );
};

export default TrailerModal;
