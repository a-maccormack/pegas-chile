import { JobPost } from "@/app/types";
import Image from "next/image";
import React from "react";
import CalendarImage from "@/assets/job-card/date-icon.png";

interface DateSectionProps {
  jobPost: JobPost;
}

export const DateSection: React.FC<DateSectionProps> = ({ jobPost }) => {
  const formatDate = () => {
    return (
      jobPost?.date?.day +
      "/" +
      jobPost?.date?.month +
      "/" +
      jobPost?.date?.year
    );
  };
  return (
    <div className="mt-20 flex items-center">
      <Image className="h-6 w-6" src={CalendarImage} alt="calendar icon" />
      <span>{formatDate()}</span>
    </div>
  );
};
