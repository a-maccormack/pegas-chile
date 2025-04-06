import { JobPost } from '@/app/types';
import data from '@/job-posts.json';

const jobPosts = data as JobPost[];

interface PaginatedCompaniesResponse {
    page: number;
    pageSize: number;
    companies: string[];
    totalPages: number;
    totalCompanies: number;
}

export const getPaginatedCompanies = (page: number = 1, pageSize: number = 10): PaginatedCompaniesResponse => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    
    const uniqueCompanies = Array.from(
        new Set(
            jobPosts
                .map(post => post.company_name)
                .filter((name): name is string => name !== null && name !== undefined)
        )
    );
    
    const sortedCompanies = uniqueCompanies.sort((a, b) => a.localeCompare(b));
    const paginatedCompanies = sortedCompanies.slice(start, end);

    return {
        page,
        pageSize,
        totalCompanies: sortedCompanies.length,
        totalPages: Math.ceil(sortedCompanies.length / pageSize),
        companies: paginatedCompanies,
    };
};

export const searchForCompaniesByTerm = (searchTerm: string): string[] => {
    if (!searchTerm) return [];
    
    const searchTermLower = searchTerm.toLowerCase();
    
    const matchingCompanies = Array.from(
        new Set(
            jobPosts
                .map(post => post.company_name)
                .filter((name): name is string => 
                    name !== null && 
                    name !== undefined && 
                    name.toLowerCase().includes(searchTermLower)
                )
        )
    );
    
    return matchingCompanies.sort((a, b) => a.localeCompare(b));
}; 