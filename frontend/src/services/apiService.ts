import { JobPost } from '@/app/types';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface PaginatedJobPostsResponse {
    page: number;
    pageSize: number;
    posts: JobPost[];
    totalPages: number;
    totalPosts: number;
}

interface SimilarCompanyNamesResponse {
    companies: string[]
}

interface TechnologiesByCompanyNameResponse {
    technologies: string[]
}

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: '/api',
        });
    }

    public async getJobPosts(
        pageNumber?: number,
    ): Promise<AxiosResponse<PaginatedJobPostsResponse>> {
        try {
            const url = pageNumber ? `/jobs/?page=${pageNumber}` : '/jobs/';
            const response = await this.axiosInstance.get(url);
            return response;
        } catch (error) {
            console.error('GetJobPosts request failed', error);
            throw error;
        }
    }

    public async searchForCompaniesByTerm(companyName: string): Promise<AxiosResponse<SimilarCompanyNamesResponse>> {
        try {
            const response = await this.axiosInstance.get(`/search/company?companyName=${companyName}`);
            return response;
        } catch (error) {
            console.error('GetJobPostsByCompanyName request failed', error);
            throw error;
        }
    }

    public async getJobPostsByCompanyName(companyName: string): Promise<AxiosResponse<JobPost[]>> {
        try {
            const response = await this.axiosInstance.post('/jobs/getJobPostsByCompanyName', { companyName: companyName });
            return response;
        } catch (error) {
            console.error('GetJobPostsByCompanyName request failed', error);
            throw error;
        }
    }

    public async getTechnologiesByCompanyName(companyName: string): Promise<AxiosResponse<TechnologiesByCompanyNameResponse>> {
        try {
            const response = await this.axiosInstance.get(`/search/technologiesByCompanyName?companyName=${companyName}`);
            return response;
        } catch (error) {
            console.error('GetTechnologiesByCompanyName request failed', error);
            throw error;
        }
    }

    public async getJobPostById(id: string): Promise<AxiosResponse<JobPost>> {
        try {
            const response = this.axiosInstance.get(`/jobs/getJobPostById?id=${id}`);
            return response;
        } catch (error) {
            console.error('GetJobPostById request failed', error);
            throw error;
        }
    }

    public async getTechnologiesByPostId(id: string): Promise<AxiosResponse<string[]>> {
        try {
            const response = this.axiosInstance.get(`/search/technologiesByPostId?id=${id}`);
            return response;
        } catch (error) {
            console.error('GetTecnologiesByPostId request failed', error);
            throw error;
        }
    }

}

export default ApiService;
