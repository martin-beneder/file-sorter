
import { useSearchParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';

type Params = {
    data: string
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function POST(req: NextRequest) {

    const body = await req.json();
    const { data } = body as Params;
    console.log("data:", data);

    const filesFormData = new FormData();
    filesFormData.append('request', JSON.stringify(data));

    const response = await fetch(env.SORTAI_API_URL as string + "create-zip/", {
        headers: {
            'access_token': env.SORTAI_API_KEY as string,
        },
        method: 'POST',
        body: filesFormData,
    });

    if (!response.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${response.status}`);
    }

    return new NextResponse(await response.blob(), { status: 200, headers: { 'Content-Type': 'application/zip' } });
}