import { JobPost } from '@/app/types';
import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface SalaryChartProps {
  companyName: string;
  jobPosts: JobPost[];
}

export const SalaryChart: React.FC<SalaryChartProps> = ({
  companyName,
  jobPosts,
}) => {
  const [chartData, setChartData] = useState<
    { date: string; salary: number | null }[]
  >([]);

  useEffect(() => {
    const data = jobPosts.map((jobPost: JobPost) => {
      const salary = parseInt(jobPost.salary_range.min_bound) / 1000000;
      return {
        date: `${jobPost.date.day}/${jobPost.date.month}/${jobPost.date.year}`,
        salary: isNaN(salary) || salary === 0 ? null : salary,
      };
    });

    setChartData((prev) => [...prev, ...data]);
  }, [jobPosts]);

  return (
    <div className="mt-20">
      {jobPosts.length > 0 ? (
        <div className="text-center mx-auto pb-10 h-40 sm:h-96 w-full">
          <h3 className="my-10 font-bold">Sueldos Historicos {companyName}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis dataKey="salary">
                <Label
                  className="hidden sm:block font-bold"
                  value="Sueldo ($M CLP)"
                  angle={-90}
                  position="insideLeft"
                />
              </YAxis>
              <Tooltip />
              <Line type="monotone" dataKey="salary" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
