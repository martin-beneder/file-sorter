
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
    if (!req.body) {
        throw new Error("Request body is empty");
    }

    console.log("responsess:", req.body);

    const body = await req.json();



    const filesFormData = new FormData();
    filesFormData.append('filejson', JSON.stringify(body));

    const sortedFiles = await fetch(env.SORTAI_API_URL as string + "sortv2/", {
        headers: {
            'access_token': env.SORTAI_API_KEY as string,
        },
        method: 'POST',
        body: filesFormData,
    });

    const sortFilesRepsons = await sortedFiles.json();
    if (!sortedFiles.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${sortedFiles.status}`);
    }

    return Response.json(sortFilesRepsons, { status: 200 });

}