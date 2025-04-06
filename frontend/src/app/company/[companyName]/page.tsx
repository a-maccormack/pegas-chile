"use client";

import { JobPost } from "@/app/types";
import Container from "@/components/container";
import { CompanyHeaderSection } from "@/containers/CompanyPage/companyHeaderSection";
import { CompanyPostsSection } from "@/containers/CompanyPage/companyPostsSection";
import { getJobPostsByCompanyName } from "@/helpers/jobPostsHelper";
import { useEffect, useState } from "react";

export const runtime = "edge";

export default function CompanyPage({
  params,
}: {
  params: { companyName: string };
}) {
  const [companyName, setCompanyName] = useState("");
  const [companyJobPosts, setCompanyJobPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params.companyName) {
      if (params.companyName.length < 3) {
        window.location.href = `/`;
      }
    }

    setCompanyName(decodeURIComponent(params.companyName));
    setLoading(true);
    
    const jobPosts = getJobPostsByCompanyName(params.companyName);
    setCompanyJobPosts(jobPosts);
    setLoading(false);
  }, [params.companyName]);

  return (
    <Container className="!w-[90%] sm:!w-[60%]">
      <CompanyHeaderSection companyName={companyName} />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : companyJobPosts.length === 0 ? (
        <div className="mt-20 text-center">
          La empresa <b>{companyName}</b> no fue encontrada.
        </div>
      ) : (
        <CompanyPostsSection
          companyName={companyName}
          companyJobPosts={companyJobPosts}
        />
      )}
    </Container>
  );
}
