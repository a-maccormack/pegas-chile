import { JobPost } from "@/app/types";
import Container from "@/components/container";
import { CompanyHeaderSection } from "@/containers/CompanyPage/companyHeaderSection";
import { CompanyPostsSection } from "@/containers/CompanyPage/companyPostsSection";
import { getJobPostsByCompanyName } from "@/helpers/jobPostsHelper";

export default function CompanyPage({
  params,
}: {
  params: { companyName: string };
}) {
  const companyName = decodeURIComponent(params.companyName);
  const companyJobPosts = getJobPostsByCompanyName(params.companyName);

  return (
    <Container className="!w-[90%] sm:!w-[60%]">
      <CompanyHeaderSection companyName={companyName} />
      {companyJobPosts.length === 0 ? (
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
