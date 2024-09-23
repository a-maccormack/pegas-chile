import { employmentIcons, JobPost, remoteWorkIcons } from "@/app/types";
import { formatSalaryRange } from "@/helpers/salary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface JobDetailSectionProps {
  jobPost: JobPost;
}

export const JobDetailSection: React.FC<JobDetailSectionProps> = ({
  jobPost,
}) => {
  const salaryRange = formatSalaryRange(jobPost);

  const remoteWorkIcon = employmentIcons[jobPost.remote_work_policy] || null;

  const normalizedEmploymentType = jobPost.employment_type
    .toLowerCase()
    .replace("título", "titulo");

  const employmentIcon = remoteWorkIcons[normalizedEmploymentType] || null;

  return (
    <div className="mt-2 flex-col gap-4 text-xl font-bold sm:flex sm:flex-row">
      <div className="text-green-600">
        {salaryRange ? (
          <div className="text-green-600">{salaryRange}</div>
        ) : (
          <div className="text-red-500">Salario no disponible</div>
        )}
      </div>
      {/* TODO: DRY */}
      <div className="mb-4 flex gap-2 align-top text-sm md:items-center md:justify-center">
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
  );
};
