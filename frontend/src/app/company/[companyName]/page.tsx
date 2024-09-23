"use client";

import { JobPost } from "@/app/types";
import Container from "@/components/container";
import { CompanyHeaderSection } from "@/containers/CompanyPage/companyHeaderSection";
import { CompanyPostsSection } from "@/containers/CompanyPage/companyPostsSection";
import ApiService from "@/services/apiService";
import { useEffect, useState } from "react";

export const runtime = "edge";

export default function CompanyPage({
  params,
}: {
  params: { companyName: string };
}) {
  const apiService = new ApiService();
  const [companyName, setCompanyName] = useState("");
  const [companyJobPosts, setCompanyJobPosts] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setCompanyName(decodeURIComponent(params.companyName));
    setLoading(true);
    apiService.getJobPostsByCompanyName(params.companyName).then((response) => {
      const jobPosts = response.data;
      setCompanyJobPosts(jobPosts);
      setLoading(false);
    });
  }, [params.companyName]);

  return (
    <Container className="!w-[90%] sm:!w-[60%]">
      <CompanyHeaderSection companyName={companyName} />
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <CompanyPostsSection
          companyName={companyName}
          companyJobPosts={companyJobPosts}
        />
      )}
    </Container>
  );
}
