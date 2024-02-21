import { CircularProgress } from '@mui/material';

const MainLoader = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#1C3334]-'>
      <CircularProgress sx={{ color: 'white' }} />
    </div>
  );
};

export default MainLoader;
