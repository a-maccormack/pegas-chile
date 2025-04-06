import { JobPost } from '@/app/types';
import data from '@/job-posts.json';

const jobPosts = data as JobPost[];

export const getTechnologiesByCompanyName = (companyName: string): string[] => {
    const companyPosts = jobPosts.filter(post => 
        post.company_name !== null && 
        post.company_name !== undefined && 
        post.company_name.toLowerCase() === companyName.toLowerCase()
    );
    
    const technologies = new Set<string>();
    companyPosts.forEach(post => {
        if (post.technologies) {
            post.technologies.forEach(tech => technologies.add(tech));
        }
    });
    
    return Array.from(technologies);
};

export const getTechnologiesByPostId = (id: number): string[] => {
    const post = jobPosts.find(post => post.id === id);
    return post?.technologies || [];
}; 