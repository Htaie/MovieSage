import { Link, type LinkProps } from 'react-router-dom';
import React from 'react';

interface MainBtnProps extends Partial<LinkProps> {
  text: any;
  to?: string | any;
  size?: string | any;
}
export const MainBtn: React.FC<MainBtnProps> = ({ text,size, to, ...props }) => {
  return (
    <Link
      to={to}
      {...props}
      className='py-3 px-4 text-xl font-bold rounded-3xl backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30 mr-4 justify-between'
    >
      <span>{text}</span>
      <span className='text-[#5138E9]'>{size}</span>
    </Link>
  );
};
