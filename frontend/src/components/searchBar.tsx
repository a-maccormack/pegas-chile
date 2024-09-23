import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (term: string) => void;
  searchResults: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchResults,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [blurTimeout, setBlurTimeout] = useState<NodeJS.Timeout | null>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setBlurTimeout(
      setTimeout(() => {
        setIsFocused(false);
      }, 200),
    );
  };

  const handleMouseEnter = () => {
    if (blurTimeout) {
      clearTimeout(blurTimeout);
    }
  };

  const handleMouseLeave = () => {
    handleInputBlur();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        focusInput();
      }

      if (event.key === "Escape") {
        if (inputRef.current) {
          inputRef.current.blur();
        }
        setIsFocused(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (blurTimeout) {
        clearTimeout(blurTimeout);
      }
    };
  }, [blurTimeout]);

  const handleDivClick = () => {
    focusInput();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchTerm = inputRef.current?.value;
    if (searchTerm && searchTerm.length >= 3) {
      // TODO: replace with next navigation or sm
      window.location.href = `/company/${searchTerm}`;
    }
  };

  return (
    <div className="min-w-[90px]">
      <form onSubmit={handleFormSubmit}>
        <div className="relative">
          <div
            className="ml-4 flex cursor-text items-center gap-2 rounded-lg bg-gray-900 px-2"
            onClick={handleDivClick}
          >
            <FontAwesomeIcon className="h-4 text-white" icon={faSearch} />
            <input
              ref={inputRef}
              className="h-8 w-full rounded bg-transparent pl-4 text-xs text-white outline-none"
              placeholder="Busca empresa por nombre"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              {...props}
            />
            <div className="hidden w-4 rounded bg-black text-center text-white sm:block">
              ⌘
            </div>
            <div className="hidden w-4 rounded bg-black text-center text-white sm:block">
              k
            </div>
          </div>
          {isFocused && searchResults.length > 0 && (
            <div
              className="absolute z-10 ml-4 w-[calc(100%-1rem)] bg-black"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {searchResults.map((result, index) => (
                <Link
                  href={`/company/${result}`}
                  key={index}
                  className="block p-2 text-white visited:text-white visited:no-underline hover:bg-gray-800"
                >
                  {result}
                </Link>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
