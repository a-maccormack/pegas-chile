import { NextRequest, NextResponse } from 'next/server';
import data from '@/job-posts.json';
import { JobPost } from '@/app/types';

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const companyNameQuery = searchParams.get('companyName');

        if (!companyNameQuery) {
            return NextResponse.json({ message: 'Please provide a company name.' }, { status: 400 });
        }

        const jobPosts = data as JobPost[];

        const filteredCompanies = Array.from(
            new Set(
                jobPosts
                    .filter((post) =>
                        post.company_name?.toLowerCase().includes(companyNameQuery.toLowerCase()) ?? false
                    )
                    .map((post) => post.company_name)
                    .filter((name): name is string => !!name)
            )
        ).slice(0, 5);


        return NextResponse.json({ companies: filteredCompanies }, { status: 200 });
    } catch (error) {
        console.error('Error fetching company names:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}