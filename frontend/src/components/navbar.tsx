"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/searchBar";
import Logo from "@/assets/navbar/logo.png";
import Link from "next/link";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { searchForCompaniesByTerm } from "@/helpers/companiesHelper";

function Navbar() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        const results = searchForCompaniesByTerm(searchTerm);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
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
        <div className="flex flex-grow items-center justify-end pl-4">
          <a
            href="https://github.com/a-maccormack/pegas-chile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4 text-white" />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
