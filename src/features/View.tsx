import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
const View = ({ genre }: { genre: string }) => {
  return (
    <>
      <Link className='text-white rounded-3xl' to={`/genre/${genre}`}>
        <div className='w-[288px] h-[432px]  backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30  '>
          <AddIcon />
        </div>
      </Link>
    </>
  );
};

export default View;
