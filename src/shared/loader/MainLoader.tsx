import { CircularProgress } from '@mui/material';

const MainLoader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <CircularProgress sx={{ color: 'white' }} />
    </div>
  );
};

export default MainLoader;
