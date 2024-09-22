import React from 'react';

interface CompanyHeaderSectionProps {
  companyName: string;
}

export const CompanyHeaderSection: React.FC<CompanyHeaderSectionProps> = ({
  companyName,
}) => {
  return (
    <div className="text-center text-xl uppercase mt-10">
      <h1 className="font-bold">{decodeURIComponent(companyName)}</h1>
    </div>
  );
};
