import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='w-full bg-gray-800 h-[100px] flex items-center mt-10'>
      <div className='container mx-auto flex flex-col-reverse md:flex-row text-white justify-between items-center'>
        <div className='flex items-center space-x-3 mb-2 md:mb-0 md:order-2'>
          <Link to={'/'} className='flex items-center'>
            <h1>
              <span className='text-white'>Movie</span>
              <span className='text-[#5138E9]'>Sage</span>
            </h1>
          </Link>
        </div>
        <div className='flex mx-space-x-1.5 md:order-1'>
          <Link to={'/'} className='hover:underline'>
            Home
          </Link>
          <span className='mx-1'>/</span>
          <Link to={'/'} className='hover:underline'>
            About
          </Link>
          <span className='mx-1'>/</span>
          <Link to={'/'} className='hover:underline'>
            Contact
          </Link>
          <span className='mx-1'>/</span>
          <Link to={'/'} className='hover:underline'>
            Privacy
          </Link>
        </div>
        <div className='text-center md:text-right'>
          <p className='hidden md:block'>Copyright © 2023</p>
          <p className='hidden md:block'>Все права защищены</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
