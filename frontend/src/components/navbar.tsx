"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import Logo from "@/assets/navbar/logo.png";
import ApiService from "@/services/apiService";
import Link from "next/link";

function Navbar() {
  const apiService = new ApiService();
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          const response =
            await apiService.searchForCompaniesByTerm(searchTerm);
          setSearchResults(response.data.companies);
        } catch (error) {
          console.error("Error fetching search results:", error);
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
    <nav className="border-gray-200 bg-black">
      <div className="mx-auto flex w-[60%] items-center py-4 sm:py-0">
        <div className="flex w-fit items-center">
          <Link href="/" className="flex items-center">
            <Image className="w-14" src={Logo} alt="Logo" />
            <div className="w-fit">
              <h1 className="hidden font-bold text-white sm:block">
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
