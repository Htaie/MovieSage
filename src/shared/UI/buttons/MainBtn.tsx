import { Link, type LinkProps } from 'react-router-dom'
import React from 'react'

interface MainBtnProps extends LinkProps {
  text: any
  to?: string | any
}

export const MainBtn: React.FC<MainBtnProps> = ({ text, to, ...props }) => {
  return (
    <Link
      to={to}
      {...props}
      className='py-3 px-4 text-xl font-bold rounded-3xl backdrop-blur-lg bg-white/10 hover:backdrop-blur-xl hover:bg-white/30 mr-4'
    >
      <span>{text}</span>
    </Link>
  )
}
