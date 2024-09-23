import Link from "next/link";
import React from "react";

interface CompanyNameSectionProps {
  companyName: string | undefined;
}

export const CompanyNameSection: React.FC<CompanyNameSectionProps> = ({
  companyName,
}) => {
  return (
    <div className="mt-20 text-5xl font-bold">
      <Link href={`/company/${companyName}`}>
        <h1>{companyName}</h1>
      </Link>
    </div>
  );
};
