import React, { useEffect, useState } from 'react';
import MovieSlider from '../../entities/MovieSlider/MovieSlider';
import axios from 'axios';

const CompletedTorrents = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //     axios.get('http://192.168.1.187:4443/getCompleted', ).then((response) => {
  //         console.log(response.data)
  //     })
  //     axios.get('http://192.168.1.187:4443/getTorrentFiles/8860e41671a68564fbb6df3cb4b2aecb5685e0ed', ).then((response) => {
  //         console.log('ssss',response)

  //     })
  // }, []);

  return (
    <>
      <MovieSlider data={[]} title={'Завершенные'} />
    </>
  );
};

export default CompletedTorrents;
