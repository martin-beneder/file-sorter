
import { subscriptionmodel } from '@/app/lib/util';
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';
import { env } from 'process';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {

    const { userId } = getAuth(req);
    if (!userId) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await clerkClient.users.getUser(userId);

    console.log("user:", user.unsafeMetadata);
    if (!((await clerkClient.users.getUser(userId)).unsafeMetadata.lastsort === null)) {

        if (new Date(String((await clerkClient.users.getUser(userId)).unsafeMetadata.lastsort)) >= (new Date().setMinutes(new Date().getMinutes() - 0.1) as unknown as Date)) {
            return Response.json({ error: "You are not allowed to sort files yet" }, { status: 400 });
        }

    }


    const body = await req.json();


    await clerkClient.users.updateUser(userId, {
        unsafeMetadata: {
            ...user?.unsafeMetadata,
            lastsort: new Date()
        }
    });




    const filesFormData = new FormData();
    filesFormData.append('filejson', JSON.stringify(body));



    let sortedFiles;

    for (let i = 0; i <= 3; i++) {

        sortedFiles = await fetch(env.SORTAI_API_URL as string + "sortv2/", {
            headers: {
                'access_token': env.SORTAI_API_KEY as string,
            },
            method: 'POST',
            body: filesFormData,
        });
        if (sortedFiles.ok) {
            break;
        }
    }
    if (!sortedFiles) {
        throw new Error(`Failed to upload file to SortAI API. Status code: 500`);
    }

    if (!sortedFiles.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: ${sortedFiles.status}`);
    }

    const sortFilesRepsons = await sortedFiles.json();


    return Response.json(sortFilesRepsons, { status: 200 });

}