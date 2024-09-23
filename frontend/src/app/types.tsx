import {
  faLaptop,
  faClock,
  faBook,
  faBatteryHalf,
  faPerson,
  faDoorOpen,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export type JobPost = {
  id: number;
  sender: string | null;
  contact_email: string[];
  contact_phone: string[];
  links: string[];
  text: string;
  date: {
    day: string;
    month: string;
    year: string;
    time: string;
  };
  company_name: string;
  remote_work_policy: string;
  employment_type: string;
  salary_range: {
    min_bound: string;
    max_bound: string;
    currency: string;
  };
  technologies: string[];
};

export const employmentIcons: Record<string, any> = {
  remote: faLaptop,
  hybrid: faDoorOpen,
  "in person": faPerson,
};

export const remoteWorkIcons: Record<string, any> = {
  practica: faBook,
  fulltime: faClock,
  "trabajo de titulo": faGraduationCap,
  part_time: faBatteryHalf,
};
