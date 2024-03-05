
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function POST(req: Request) {
    const body = await req.json();


    console.log("response:", body.reponstext);

    const filesFormData = new FormData();
    filesFormData.append('filejson', body.reponstext);

    const sortedFiles = await fetch('https://sortaiapi.azurewebsites.net/sort/', {
        headers: {
            'access_token': env.SORTAI_API_KEY as string,
        },
        method: 'POST',
        body: filesFormData,
    });

    const sortFilesRepsons = JSON.parse(JSON.stringify(await sortedFiles.text()));
    console.log("response Sorted Files:", sortFilesRepsons);

    if (!sortedFiles.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${sortedFiles.status}`);
    }

    return new Response(sortFilesRepsons, { status: 200 });

}