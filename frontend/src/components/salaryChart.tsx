import { JobPost } from "@/app/types";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalaryChartProps {
  jobPosts: JobPost[];
}

export const SalaryChart: React.FC<SalaryChartProps> = ({ jobPosts }) => {
  const [chartData, setChartData] = useState<
    { date: string; salary: number | null; currency: string }[]
  >([]);
  const [salaryType, setSalaryType] = useState<"min" | "middle" | "upper">(
    "min",
  );

  useEffect(() => {
    const data = jobPosts.map((jobPost: JobPost) => {
      const minSalary = parseInt(jobPost.salary_range.min_bound);
      const upperSalary = parseInt(jobPost.salary_range.max_bound) || minSalary;
      let salary: number | null = null;

      const isUSD = jobPost.salary_range.currency === "USD";

      if (salaryType === "min") {
        salary = isUSD
          ? isNaN(minSalary) || minSalary === 0
            ? null
            : minSalary / 1000
          : isNaN(minSalary) || minSalary === 0
            ? null
            : minSalary / 1000000;
      } else if (salaryType === "middle") {
        const middleSalary = (minSalary + upperSalary) / 2;
        salary = isUSD
          ? isNaN(middleSalary) || middleSalary === 0
            ? null
            : middleSalary / 1000
          : isNaN(middleSalary) || middleSalary === 0
            ? null
            : middleSalary / 1000000;
      } else if (salaryType === "upper") {
        salary = isUSD
          ? isNaN(upperSalary) || upperSalary === 0
            ? null
            : upperSalary / 1000
          : isNaN(upperSalary) || upperSalary === 0
            ? null
            : upperSalary / 1000000;
      }

      return {
        date: `${jobPost.date.day}/${jobPost.date.month}/${jobPost.date.year}`,
        salary: salary,
        currency: jobPost.salary_range.currency,
      };
    });

    setChartData(data);
  }, [jobPosts, salaryType]);

  return (
    <div className="h-fit flex-grow rounded-md border border-gray-200 px-4 pb-14 shadow-sm">
      <h3 className="my-10 text-center font-bold">Sueldos Historicos</h3>
      {jobPosts.length > 0 ? (
        <div className="mx-auto h-40 w-full pb-10 text-center sm:h-96 2xl:max-w-2xl">
          <div className="mb-5">
            <label className="mr-2">Selecciona el tipo de sueldo:</label>
            <select
              value={salaryType}
              onChange={(e) =>
                setSalaryType(e.target.value as "min" | "middle" | "upper")
              }
              className="rounded border px-3 py-2"
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
                  className="hidden font-bold sm:block"
                  value={`Sueldo (${chartData[0]?.currency === "USD" ? "$K USD" : "$M CLP"})`}
                  angle={-90}
                  position="insideLeft"
                />
              </YAxis>
              <Tooltip
                formatter={(value: any) =>
                  `$ ${value} ${chartData[0]?.currency === "USD" ? "K" : "M"}`
                }
              />
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
