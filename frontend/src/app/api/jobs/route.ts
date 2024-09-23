import { NextResponse, type NextRequest } from 'next/server';
import { JobPost } from '@/app/types';
import data from '@/job-posts.json';

export const runtime = 'edge';

const jobPosts = data as JobPost[];

export async function GET(request: Request) {
    const pageSize = 10;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const reversedJobPosts = [...jobPosts].reverse();

    const paginatedPosts = reversedJobPosts.slice(start, end);

    return NextResponse.json({
        page,
        pageSize,
        totalPosts: reversedJobPosts.length,
        totalPages: Math.ceil(reversedJobPosts.length / pageSize),
        posts: paginatedPosts,
    });
}
