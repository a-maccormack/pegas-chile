import { JobPost } from '@/app/types';

export const formatSalaryRange = (jobPost: JobPost) => {
    const isUSD = jobPost.salary_range.currency === "USD";
    const divisor = isUSD ? 1000 : 1000000;

    const minBound = parseInt(jobPost.salary_range.min_bound) / divisor;
    const maxBound = parseInt(jobPost.salary_range.max_bound) / divisor;

    if (isNaN(minBound) || minBound === 0) {
        return null;
    }

    const formattedMinBound = minBound;
    const formattedMaxBound =
        isNaN(maxBound) || maxBound === 0 ? null : maxBound;

    return formattedMaxBound === null ||
        jobPost.salary_range.min_bound === jobPost.salary_range.max_bound
        ? `${jobPost.salary_range.currency} $${formattedMinBound} ${isUSD ? "K" : "M"}`
        : `${jobPost.salary_range.currency} $${formattedMinBound} ${isUSD ? "K" : "M"} - $${formattedMaxBound} ${isUSD ? "K" : "M"}`;
};