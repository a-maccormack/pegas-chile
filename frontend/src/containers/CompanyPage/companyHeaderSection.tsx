import React from "react";

interface CompanyHeaderSectionProps {
  companyName: string;
}

export const CompanyHeaderSection: React.FC<CompanyHeaderSectionProps> = ({
  companyName,
}) => {
  return (
    <div className="mt-10 text-center text-5xl">
      <h1 className="font-bold">{decodeURIComponent(companyName)}</h1>
    </div>
  );
};
