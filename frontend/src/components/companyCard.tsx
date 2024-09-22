import Image, { StaticImageData } from "next/image";
import React from "react";

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
      className={`flex w-24 items-center gap-2 align-middle md:flex md:w-40 ${className}`}
    >
      <div>
        <Image src={src} alt={alt} />
      </div>
      <div>
        <p className="hidden w-max font-bold text-green-600 md:block md:text-3xl">
          {salary}
        </p>
      </div>
    </div>
  );
};
