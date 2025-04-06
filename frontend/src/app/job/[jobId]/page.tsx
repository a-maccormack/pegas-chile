"use client";

import { JobPost } from "@/app/types";
import Container from "@/components/container";
import { TechnologiesContainer } from "@/components/technologiesContainer";
import { CompanyNameSection } from "@/containers/JobPostPage/companyNameSection";
import { ContactSection } from "@/containers/JobPostPage/contactSection";
import { LinkSection } from "@/containers/JobPostPage/linkSection";
import { JobDetailSection } from "@/containers/JobPostPage/jobDetailSection";
import { getJobPostById } from "@/helpers/jobPostsHelper";
import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { DateSection } from "@/containers/JobPostPage/dateSection";

export const runtime = "edge";

export default function JobPage({ params }: { params: { jobId: string } }) {
  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobPost = () => {
      try {
        if (params.jobId) {
          const post = getJobPostById(parseInt(params.jobId));
          if (post) {
            setJobPost(post);
          } else {
            setError("Job post not found");
          }
        }
      } catch (err) {
        setError("Error fetching job post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPost();
  }, [params.jobId]);

  if (!jobPost) {
    return <div className="text-red-500">{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
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
