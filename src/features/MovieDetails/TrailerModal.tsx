const TrailerModal = ({ trailer }: { trailer: any }): JSX.Element => {
  return (
    <div style={{ textAlign: 'center' }}>
      <iframe width='1200' height='800' src={trailer}></iframe>
    </div>
  );
};

export default TrailerModal;
