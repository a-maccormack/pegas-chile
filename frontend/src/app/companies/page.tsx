import Container from "@/components/container";
import { CompanyBoardSection } from "@/containers/CompaniesPage/companyBoardSection";
import { HeaderSection } from "@/containers/CompaniesPage/headerSection";
import React, { Suspense } from "react";

const CompaniesPage = () => {
  return (
    <Container>
      <HeaderSection />
      <Suspense>
        <CompanyBoardSection />
      </Suspense>
    </Container>
  );
};

export default CompaniesPage;
