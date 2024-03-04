
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
    
    const formData = new FormData();

    for (const file of body) {
        const { name, result } = file;
        const url = result.url as string;
        await convertLinkToFormData(formData, url, "files", name);
    }

    const response = await fetch('https://sortaiapi.azurewebsites.net/uploadfile/', {
        headers: {
            'access_token': env.SORTAI_API_KEY as string,
        },
        method: 'POST',
        body: formData,
    });
    console.log("response:", await response.text());
    console.log("response:", await response.json());

    if (!response.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${response.status}`);
    }

    return new Response('Email added successfully', { status: 200 });
    
}