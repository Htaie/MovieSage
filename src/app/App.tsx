import { Outlet } from 'react-router-dom';
import Footer from '../shared/Navigation/Footer/Footer';
import NavBar from '../shared/Navigation/Header/NavBar';
const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
