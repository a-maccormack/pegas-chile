import { JobPost } from '@/app/types';
import { SalaryChart } from '@/components/salaryChart';

interface SalaryChartSectionProps {
  companyName: string;
  companyJobPosts: JobPost[];
}

export const SalaryChartSection: React.FC<SalaryChartSectionProps> = ({
  companyName,
  companyJobPosts,
}) => {
  return <SalaryChart companyName={companyName} jobPosts={companyJobPosts} />;
};
