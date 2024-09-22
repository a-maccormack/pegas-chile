import { NextResponse, type NextRequest } from 'next/server';
import { JobPost } from '@/app/types';
import data from '@/job-posts.json';

export const runtime = 'edge';

interface RequestBody {
    companyName: string;
}

const jobPosts = data as JobPost[];

const getJobPostsByCompanyName = (companyName?: string): JobPost[] => {
    if (!companyName) {
        return [];
    }
    const lowerCaseCompanyName = companyName.toLowerCase();
    return jobPosts.filter((post) => post.company_name?.toLowerCase().includes(lowerCaseCompanyName));
};

export async function POST(request: NextRequest, context: { pageNumber: string }) {
    const { companyName } = (await request.json()) as RequestBody;

    const decodedCompanyName = decodeURIComponent(companyName);

    const results = getJobPostsByCompanyName(decodedCompanyName);
    return NextResponse.json(results);
}
