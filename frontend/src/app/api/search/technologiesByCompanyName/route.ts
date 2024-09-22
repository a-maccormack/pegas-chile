import { NextRequest, NextResponse } from 'next/server';
import data from '@/job-posts.json';
import { JobPost } from '@/app/types';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const companyNameQuery = searchParams.get('companyName');

        if (!companyNameQuery) {
            return NextResponse.json({ message: 'Please provide a company name.' }, { status: 400 });
        }

        const jobPosts = data as JobPost[];

        const filteredJobPosts = jobPosts.filter((post) =>
            post.company_name?.toLowerCase().includes(companyNameQuery.toLowerCase())
        );

        if (filteredJobPosts.length === 0) {
            return NextResponse.json({ message: 'No job posts found for the given company name.' }, { status: 404 });
        }

        const technologies = Array.from(
            new Set(
                filteredJobPosts.flatMap((post) => post.technologies || [])
            )
        );

        return NextResponse.json({ technologies }, { status: 200 });
    } catch (error) {
        console.error('Error fetching technologies:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
