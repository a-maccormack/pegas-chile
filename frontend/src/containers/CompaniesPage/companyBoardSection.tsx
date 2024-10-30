"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
// TODO: make into a common component
import ApiService from "@/services/apiService";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const CompanyBoardSection = () => {
  const apiService = new ApiService();

  const [companies, setCompanies] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await apiService.getCompanies(page);
      setCompanies((previousCompanies) => [
        ...previousCompanies,
        ...response.data.companies,
      ]);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching companies posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("executing-use-effect");
    console.log(page);
    fetchCompanies();
  }, [page]);

  const { loadMoreRef } = useInfiniteScroll({
    totalPages,
    loading,
    onLoadMore: () => setPage((prevPage) => prevPage + 1),
  });

  return (
    <>
      <div
        className="my-16 flex flex-col gap-5 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 350px)" }}
      >
        <CompaniesList companies={companies} />
        <div ref={loadMoreRef}>
          <LoadingIndicator loading={loading} />
        </div>
      </div>
    </>
  );
};

//TODO: move to own component
const CompaniesList = ({ companies }: { companies: string[] }) => (
  <>
    {companies.length > 0 &&
      companies.map((company, index) => (
        <Link
          key={index}
          href={`/company/${company}`}
          className="h-40 w-full rounded-md border border-gray-200 py-2 hover:bg-carrousel-gray"
        >
          <div className="ml-2">{company}</div>
        </Link>
      ))}
  </>
);

const LoadingIndicator = ({ loading }: { loading: boolean }) => (
  <div className="flex h-10 w-full items-center justify-center">
    {loading && <p>Loading more companies...</p>}
  </div>
);
