import { NextResponse, type NextRequest } from 'next/server';
import { JobPost } from '@/app/types';
import data from '@/job-posts.json';

export const runtime = 'edge';

const jobPosts = data as JobPost[];

const getJobPostById = (id: number): JobPost | {} => {
    if (id < 1 || id >= jobPosts.length + 1) {
        return {};
    }
    return jobPosts[id - 1].technologies;
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id');

    if (!jobId) {
        return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const parsedJobId = parseInt(jobId, 10);
    const results = getJobPostById(parsedJobId);

    return NextResponse.json(results);
}
