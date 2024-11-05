import { Outlet } from 'react-router-dom';
import NavBar from '../widgets/Navigation/Header/NavBar';
const App = (): JSX.Element => {
  return (
    <div className='flex h-screen'>
      <div className='w-2/12 '>
        <NavBar />
      </div>
      <div className='w-3/4 pl-9 flex-grow'>
        <Outlet />
      </div>
    </div>
  );
};
export default App;
