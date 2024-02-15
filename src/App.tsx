import { Outlet } from 'react-router-dom';
import Footer from './components/Navigation/Footer/Footer';
import NavBar from './components/Navigation/Header/NavBar';
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
