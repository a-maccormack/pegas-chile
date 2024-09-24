import Container from "@/components/container";
import React, { Suspense } from "react";
import { TitleSection } from "@/containers/JobsPage/titleSection";
import { JobBoardSection } from "@/containers/JobsPage/jobBoardSection";

const JobsPage = () => {
  return (
    <Container className="!w-[90%] sm:!w-[60%]">
      <TitleSection />
      <Suspense>
        <JobBoardSection />
      </Suspense>
    </Container>
  );
};

export default JobsPage;
