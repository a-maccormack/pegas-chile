import { employmentIcons, JobPost, remoteWorkIcons } from "@/app/types";
import Image from "next/image";
import React from "react";
import CalendarIcon from "@/assets/job-card/date-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { formatSalaryRange } from "@/helpers/salary";

interface JobPostCardProps {
  jobPost: JobPost;
  trunc?: boolean;
}

export const JobPostCard: React.FC<JobPostCardProps> = ({ jobPost, trunc }) => {
  let truncatedCompanyName = jobPost.company_name;

  if (trunc) {
    truncatedCompanyName =
      jobPost.company_name && jobPost.company_name.length > 8
        ? jobPost.company_name.slice(0, 5) + "..."
        : jobPost.company_name || "Unknown Company";
  }

  const salaryRange = formatSalaryRange(jobPost);
  const remoteWorkIcon = employmentIcons[jobPost.remote_work_policy] || null;

  const normalizedEmploymentType = jobPost.employment_type
    .toLowerCase()
    .replace("título", "titulo");

  const employmentIcon = remoteWorkIcons[normalizedEmploymentType] || null;

  return (
    <Link href={`/job/${jobPost.id}`}>
      <div className="w-full rounded-md border border-gray-200 px-6 py-4">
        <div className="flex-row gap-4 md:flex md:items-center">
          <div>
            <h1 className="text-4xl font-bold">{truncatedCompanyName}</h1>
            <div className="flex">
              <Image
                className="h-6 w-6"
                src={CalendarIcon}
                alt="Calendar Icon"
              />
              {jobPost.date.day}/{jobPost.date.month}/{jobPost.date.year}
            </div>
          </div>
          <div className="mb-4 flex gap-2 align-top md:items-center md:justify-center">
            <div className="flex items-center gap-1 whitespace-nowrap rounded-md bg-carrousel-gray p-1 font-bold">
              {remoteWorkIcon && <FontAwesomeIcon icon={remoteWorkIcon} />}
              {jobPost.remote_work_policy}
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap rounded-md bg-carrousel-gray p-1 font-bold">
              {employmentIcon && <FontAwesomeIcon icon={employmentIcon} />}
              {normalizedEmploymentType}
            </div>
          </div>
        </div>
        <div className="text-2xl font-extrabold">
          {salaryRange ? (
            <div className="text-green-600">{salaryRange}</div>
          ) : (
            <div className="text-red-500">Salario no disponible</div>
          )}
        </div>
      </div>
    </Link>
  );
};
