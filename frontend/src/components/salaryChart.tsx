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
  const [salaryType, setSalaryType] = useState<'min' | 'middle' | 'upper'>(
    'min'
  );

  useEffect(() => {
    const data = jobPosts.map((jobPost: JobPost) => {
      const minSalary = parseInt(jobPost.salary_range.min_bound) / 1000000;
      const upperSalary = parseInt(jobPost.salary_range.max_bound) / 1000000;
      let salary: number | null = null;

      if (salaryType === 'min') {
        salary = isNaN(minSalary) || minSalary === 0 ? null : minSalary;
      } else if (salaryType === 'middle') {
        const middleSalary = (minSalary + upperSalary) / 2;
        salary =
          isNaN(middleSalary) || middleSalary === 0 ? null : middleSalary;
      } else if (salaryType === 'upper') {
        salary = isNaN(upperSalary) || upperSalary === 0 ? null : upperSalary;
      }

      return {
        date: `${jobPost.date.day}/${jobPost.date.month}/${jobPost.date.year}`,
        salary: salary,
      };
    });

    console.log(data);
    setChartData(data);
  }, [jobPosts, salaryType]);

  return (
    <div className="mt-20">
      {jobPosts.length > 0 ? (
        <div className="text-center mx-auto pb-10 h-40 sm:h-96 w-full">
          <h3 className="my-10 font-bold">Sueldos Historicos {companyName}</h3>
          <div className="mb-5">
            <label className="mr-2">Selecciona el tipo de sueldo:</label>
            <select
              value={salaryType}
              onChange={(e) =>
                setSalaryType(e.target.value as 'min' | 'middle' | 'upper')
              }
              className="border rounded px-3 py-2"
            >
              <option value="min">Franja Inferior</option>
              <option value="middle">Promedio (Mín y Máx)</option>
              <option value="upper">Franja superior</option>
            </select>
          </div>

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
