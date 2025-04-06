import { JobPost } from "@/app/types";
import Container from "@/components/container";
import { TechnologiesContainer } from "@/components/technologiesContainer";
import { CompanyNameSection } from "@/containers/JobPostPage/companyNameSection";
import { ContactSection } from "@/containers/JobPostPage/contactSection";
import { LinkSection } from "@/containers/JobPostPage/linkSection";
import { JobDetailSection } from "@/containers/JobPostPage/jobDetailSection";
import { getJobPostById } from "@/helpers/jobPostsHelper";
import ReactMarkDown from "react-markdown";
import { DateSection } from "@/containers/JobPostPage/dateSection";

export default function JobPage({ params }: { params: { jobId: string } }) {
  const jobPost = getJobPostById(parseInt(params.jobId));

  if (!jobPost) {
    return (
      <Container>
        <div className="text-red-500">Job post not found</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-10">
        <DateSection jobPost={jobPost} />
        <CompanyNameSection companyName={jobPost.company_name} />
        <JobDetailSection jobPost={jobPost} />
        <ContactSection jobPost={jobPost} />
        <div>
          <ReactMarkDown>{jobPost.text}</ReactMarkDown>
        </div>
        {jobPost.links && <LinkSection links={jobPost.links} />}
        <div className="my-2">
          <TechnologiesContainer
            companyName={jobPost.company_name}
            jobId={jobPost.id}
          />
        </div>
      </div>
    </Container>
  );
}
