"use client";

// TODO: make into a common component
import { JobPost } from "@/app/types";
import { JobPostCard } from "@/components/jobPostCard";
import ApiService from "@/services/apiService";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const JobBoardSection = () => {
  const apiService = new ApiService();
  const router = useRouter();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const [page, setPage] = useState<number>(1);
  const [jobs, setJobs] = useState<JobPost[] | null>(null);
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
      .getJobPosts(page)
      .then((response) => {
        setJobs(response.data.posts);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching job posts:", error);
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
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobPostCard key={index} jobPost={job} trunc={false} />
          ))
        ) : (
          <p>Loading jobs...</p>
        )}
      </div>
    </>
  );
};
