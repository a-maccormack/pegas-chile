export type JobPost = {
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
  };
  technologies: string[];
};
