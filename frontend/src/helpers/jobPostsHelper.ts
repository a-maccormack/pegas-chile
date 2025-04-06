import { JobPost } from '@/app/types';
import data from '@/job-posts.json';

const jobPosts = data as JobPost[];

interface PaginatedJobPostsResponse {
    page: number;
    pageSize: number;
    posts: JobPost[];
    totalPages: number;
    totalPosts: number;
}

export const getPaginatedJobPosts = (page: number = 1, pageSize: number = 10): PaginatedJobPostsResponse => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    const reversedJobPosts = [...jobPosts].reverse();
    const paginatedPosts = reversedJobPosts.slice(start, end);

    return {
        page,
        pageSize,
        totalPosts: reversedJobPosts.length,
        totalPages: Math.ceil(reversedJobPosts.length / pageSize),
        posts: paginatedPosts,
    };
};

export const getJobPostById = (id: number): JobPost | undefined => {
    return jobPosts.find(post => post.id === id);
};

export const getJobPostsByCompanyName = (companyName: string): JobPost[] => {
    return jobPosts.filter(post => 
        post.company_name !== null && 
        post.company_name !== undefined && 
        post.company_name.toLowerCase() === companyName.toLowerCase()
    );
}; 