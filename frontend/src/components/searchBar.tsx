import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
      }, 200)
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
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        focusInput();
      }

      if (event.key === 'Escape') {
        if (inputRef.current) {
          inputRef.current.blur();
        }
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
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

  return (
    <div className="relative">
      <div
        className="ml-4 flex items-center gap-2 bg-gray-900 px-2 rounded-lg cursor-text"
        onClick={handleDivClick}
      >
        <FontAwesomeIcon className="text-white h-4" icon={faSearch} />
        <input
          ref={inputRef}
          className="rounded h-8 text-xs w-full pl-4 bg-transparent text-white outline-none"
          placeholder="Busca empresa por nombre"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          {...props}
        />
        <div className="text-white rounded bg-black w-4 text-center hidden sm:block">
          ⌘
        </div>
        <div className="text-white rounded bg-black w-4 text-center hidden sm:block">
          k
        </div>
      </div>
      {isFocused && searchResults.length > 0 && (
        <div
          className="absolute ml-4 w-[calc(100%-1rem)] bg-black z-10"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {searchResults.map((result, index) => (
            <Link
              href={`/company/${result}`}
              key={index}
              className="text-white p-2 hover:bg-gray-800 block visited:text-white visited:no-underline"
            >
              {result}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
