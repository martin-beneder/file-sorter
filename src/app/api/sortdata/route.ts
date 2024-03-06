
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
    if (!req.body) {
        throw new Error("Request body is empty");
    }

    const chunks = [];
    const reader = req.body.getReader();
    let result;
    while (!(result = await reader.read()).done) {
        chunks.push(result.value);
    }
    const concatenatedChunks = new Uint8Array(chunks.reduce((acc: number[], val) => acc.concat(Array.from(val)), []));
    const body = new TextDecoder().decode(concatenatedChunks);

    console.log("response:", body);


    const filesFormData = new FormData();
    filesFormData.append('filejson', body);

    const sortedFiles = await fetch('https://sortaiapi.azurewebsites.net/sort/', {
        headers: {
            'access_token': env.SORTAI_API_KEY as string,
        },
        method: 'POST',
        body: filesFormData,
    });

    const sortFilesRepsons = await sortedFiles.text();
    if (!sortedFiles.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${sortedFiles.status}`);
    }

    return new Response(sortFilesRepsons, { status: 200 });

}