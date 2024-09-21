import React from 'react';
import Image from 'next/image';

function Navbar() {
  return (
    <nav className="bg-black border-gray-200">
      <div className="flex items-center w-[60%] mx-auto">
        <div className="h-14 w-14 relative">
          <Image src="/favicon.ico" alt="Logo" fill />
        </div>
        <div>
          <h1 className="font-bold text-white">PegasChile</h1>
        </div>
        <div className="ml-4">
          <input
            className="rounded h-8 text-xs w-60 pl-4"
            placeholder="Busca empresa por nombre"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
