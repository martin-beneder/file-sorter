
import { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function convertLinkToFormData(formData: FormData, url: string, fieldName: string, filename: string): Promise<FormData> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download file from ${url}. Status code: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();


    // In browsers, you can directly use Blob for file data in FormData
    const blob = new Blob([arrayBuffer], { type: response.headers.get("content-type")! });

    // Append the file (as a Blob) to the form data
    formData.append(fieldName, blob, filename);

    return formData;
}

export async function POST(req: Request) {
    const body = await req.json();

    const filesFormData = new FormData();
    filesFormData.append('filejson', JSON.stringify(body));


    const response = await fetch(env.SORTAI_API_URL as string + "uploadfilev2/", {
        headers: {
            'access_token': env.SORTAI_API_KEY as string,
        },
        method: 'POST',
        body: filesFormData,
    });
    const reponstext = await response.json();
    console.log("reponstext:", reponstext);

    if (!response.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${response.status}`);
    }
    return Response.json(reponstext, { status: 200 });

}