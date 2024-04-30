import { Outlet } from 'react-router-dom';
import Footer from '../widgets/Navigation/Footer/Footer';
import NavBar from '../widgets/Navigation/Header/NavBar';
const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
