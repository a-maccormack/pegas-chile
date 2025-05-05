"use client";

import { JobPost } from "@/app/types";
import { JobPostCard } from "@/components/jobPostCard";
import ApiService from "@/services/apiService";
import React, { useEffect, useState } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"; // Import custom hook

export const JobBoardSection = () => {
  const apiService = new ApiService();

  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await apiService.getJobPosts(page);
      setJobs((prevJobs) => [...prevJobs, ...response.data.posts]);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const { loadMoreRef } = useInfiniteScroll({
    totalPages,
    loading,
    // TODO: check double api call on first render
    onLoadMore: () => setPage((prevPage) => prevPage + 1),
  });

  return (
    <div
      className="mb-20 flex flex-col gap-5 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 350px)" }}
    >
      <JobsList jobs={jobs} />
      <div ref={loadMoreRef}>
        <LoadingIndicator loading={loading} />
      </div>
    </div>
  );
};

//TODO: move to own component
const JobsList = ({ jobs }: { jobs: JobPost[] }) => (
  <>
    {jobs.length > 0 &&
      jobs.map((job, index) => (
        <JobPostCard key={index} jobPost={job} trunc={false} />
      ))}
  </>
);

const LoadingIndicator = ({ loading }: { loading: boolean }) => (
  <div className="flex h-10 w-full items-center justify-center">
    {loading && <p>Loading more jobs...</p>}
  </div>
);
