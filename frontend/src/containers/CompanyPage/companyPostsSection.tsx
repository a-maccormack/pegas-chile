import { JobPost } from "@/app/types";
import { JobPostCard } from "@/components/jobPostCard";
import { SalaryChart } from "@/components/salaryChart";
import { TechnologiesContainer } from "@/components/technologiesContainer";

interface SalaryChartSectionProps {
  companyName: string;
  companyJobPosts: JobPost[];
}

export const CompanyPostsSection: React.FC<SalaryChartSectionProps> = ({
  companyName,
  companyJobPosts,
}) => {
  return (
    <div className="my-20 flex-row justify-center gap-4 2xl:flex">
      <div className="mb-4 flex flex-col gap-4 2xl:mx-auto 2xl:w-3/5">
        <SalaryChart jobPosts={companyJobPosts} />
        <TechnologiesContainer companyName={companyName} />
      </div>
      <div className="flex max-h-[550px] flex-col gap-2 overflow-y-auto">
        {companyJobPosts
          .slice()
          .reverse()
          .map((jobPost, index) => (
            <JobPostCard key={index} jobPost={jobPost} />
          ))}
      </div>
    </div>
  );
};
