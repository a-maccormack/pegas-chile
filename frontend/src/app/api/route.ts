import { NextResponse, type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    let responseText = 'Hello World'

    return NextResponse.json({ example: "string" })
}

