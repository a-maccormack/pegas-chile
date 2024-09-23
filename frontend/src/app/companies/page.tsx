import Container from "@/components/container";
import { CompanyBoardSection } from "@/containers/CompaniesPage/companyBoardSection";
import { HeaderSection } from "@/containers/CompaniesPage/headerSection";
import React from "react";

const CompaniesPage = () => {
  return (
    <Container>
      <HeaderSection />
      <CompanyBoardSection />
    </Container>
  );
};

export default CompaniesPage;
