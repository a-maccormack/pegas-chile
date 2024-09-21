'use client';

import React from 'react';
import Image from 'next/image';
import SearchBar from '../searchBar';
import Logo from '@/assets/navbar/logo.png';

function Navbar() {
  return (
    <nav className="bg-black border-gray-200">
      <div className="flex items-center w-[60%] mx-auto py-4 sm:py-0">
        <div className="flex items-center w-fit">
          <Image className="w-14" src={Logo} alt="Logo" />
          <div className="w-fit">
            <h1 className="font-bold text-white hidden sm:block">PegasChile</h1>
          </div>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}

export default Navbar;
