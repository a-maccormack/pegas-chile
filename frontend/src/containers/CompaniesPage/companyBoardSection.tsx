"use client";

// TODO: make into a common component
import ApiService from "@/services/apiService";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const CompanyBoardSection = () => {
  const apiService = new ApiService();
  const router = useRouter();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState<string[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (pageParam) {
      const initialPage = parseInt(pageParam, 10);
      if (!isNaN(initialPage) && initialPage > 0) {
        setPage(initialPage);
      }
    }
  }, [pageParam]);

  useEffect(() => {
    apiService
      .getCompanies(page)
      .then((response) => {
        setCompanies(response.data.companies);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, [page, pageParam]);

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      router.push(`?page=${newPage}`);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      router.push(`?page=${newPage}`);
    }
  };

  return (
    <>
      <div className="my-5 flex items-center justify-between">
        <button
          className={`rounded bg-green-600 px-4 py-2 text-white ${
            page === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <span className="text-xl">
          Página {page} de {totalPages}
        </span>
        <button
          className={`rounded bg-green-600 px-4 py-2 text-white ${
            page === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div
        className="mb-20 flex flex-col gap-5 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 350px)" }}
      >
        {companies && companies.length > 0 ? (
          companies.map((company, index) => (
            <Link
              key={index}
              href={`/company/${company}`}
              className="w-full rounded-md border border-gray-200 py-2 hover:bg-carrousel-gray"
            >
              <div className="ml-2">{company}</div>
            </Link>
          ))
        ) : (
          <p>Loading companies...</p>
        )}
      </div>
    </>
  );
};
