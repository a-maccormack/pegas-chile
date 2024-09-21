import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CompanyCardProps {
  src: StaticImageData;
  alt: string;
  salary: string;
  className?: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  src,
  alt,
  salary,
  className,
}) => {
  return (
    <div
      className={`flex items-center gap-2 w-24 md:w-40 align-middle md:flex ${className}`}
    >
      <div>
        <Image src={src} alt={alt} />
      </div>
      <div>
        <p className="text-green-600 hidden md:text-3xl md:block font-bold w-max">
          {salary}
        </p>
      </div>
    </div>
  );
};
