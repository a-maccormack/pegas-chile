import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';

const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const blurInput = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        focusInput();
      }

      if (event.key === 'Escape') {
        blurInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDivClick = () => {
    focusInput();
  };

  return (
    <div
      className="ml-4 flex items-center gap-2 bg-gray-900 px-2 rounded-lg cursor-text"
      onClick={handleDivClick}
    >
      <FontAwesomeIcon className="text-white h-4" icon={faSearch} />
      <input
        ref={inputRef}
        className="rounded h-8 text-xs w-full pl-4 bg-transparent text-white outline-none"
        placeholder="Busca empresa por nombre"
      />
      <div className="text-white rounded bg-black w-4 text-center hidden sm:block">
        ⌘
      </div>
      <div className="text-white rounded bg-black w-4 text-center hidden sm:block">
        k
      </div>
    </div>
  );
};

export default SearchBar;
