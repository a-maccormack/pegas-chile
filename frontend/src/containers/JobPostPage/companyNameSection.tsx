import Link from "next/link";
import React from "react";

interface CompanyNameSectionProps {
  companyName: string | undefined;
}

export const CompanyNameSection: React.FC<CompanyNameSectionProps> = ({
  companyName,
}) => {
  return (
    <div className="text-5xl font-bold">
      <Link className="text-blue-500" href={`/company/${companyName}`}>
        <h1>{companyName}</h1>
      </Link>
    </div>
  );
};
