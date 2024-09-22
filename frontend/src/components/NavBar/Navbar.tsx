'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SearchBar from '../searchBar';
import Logo from '@/assets/navbar/logo.png';
import ApiService from '@/services/apiService';
import Link from 'next/link';

function Navbar() {
  const apiService = new ApiService();
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          const response = await apiService.searchForCompaniesByTerm(
            searchTerm
          );
          console.log();
          setSearchResults(response.data.companies);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const handler = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <nav className="bg-black border-gray-200">
      <div className="flex items-center w-[60%] mx-auto py-4 sm:py-0">
        <div className="flex items-center w-fit">
          <Link href="/" className="flex items-center">
            <Image className="w-14" src={Logo} alt="Logo" />
            <div className="w-fit">
              <h1 className="font-bold text-white hidden sm:block">
                PegasChile
              </h1>
            </div>
          </Link>
        </div>
        <SearchBar
          onChange={handleSearchChange}
          searchResults={searchResults}
        />
      </div>
    </nav>
  );
}

export default Navbar;
