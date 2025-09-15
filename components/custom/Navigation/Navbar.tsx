'use client';
import { usePathname } from 'next/navigation';
import React from 'react'
import NavBarSubMenu from './NavBarSubMenu';

const Navbar = () => {
  const pathname = usePathname().replace('/', '');

  return (
    <nav className='flex flex-col fixed inset-y-0 w-full z-[50] h-min'>
      <div className='flex items-center text-white h-[70px] bg-[#ff8226] md:pl-[18rem] capitalize'>
        {pathname.replaceAll('/', ' / ')}
      </div>
      <div className='w-full h-[60px] bg-white md:pl-[18rem]'>
        <NavBarSubMenu />
      </div>
    </nav>
  )
}

export default Navbar