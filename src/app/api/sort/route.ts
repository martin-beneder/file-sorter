
import { subscriptionmodel } from '@/app/lib/util';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
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

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);
    if (!userId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await clerkClient.users.getUser(userId);
    const body = await req.json();
    if (JSON.stringify(body).length < subscriptionmodel(user?.unsafeMetadata?.subscriptionid as number)?.maxfiles ?? 0) {
        return Response.json({ error: "File limit exceeded" }, { status: 400 });
    }



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