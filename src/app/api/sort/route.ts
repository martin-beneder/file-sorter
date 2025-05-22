import { subscriptionmodel } from '@/app/lib/util';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';
import { currentUser } from '@clerk/nextjs/server';

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
    const { userId } = await getAuth(req);

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    

    await (await clerkClient()).users.updateUser(userId, {
        unsafeMetadata: {
            ...user?.unsafeMetadata,
            lastsort: new Date()
        }
    });;
    const body = await req.json();
    if (JSON.stringify(body).length < (subscriptionmodel(user?.unsafeMetadata?.subscriptionid as number)?.maxfiles || 0)) {
        return NextResponse.json({ error: "File limit exceeded" }, { status: 400 });
    }

    if (!(user?.unsafeMetadata?.lastfileupload === null)) {
        const lastUploadTime = new Date(String(user?.unsafeMetadata?.lastfileupload));
        const cooldownTime = new Date();
        cooldownTime.setSeconds(cooldownTime.getSeconds() - 30); // 30 second cooldown
        
        if (lastUploadTime >= cooldownTime) {
            return NextResponse.json({ error: "You are not allowed to upload files yet" }, { status: 400 });
        }
    }

    console.log("file:", body);



    const filesFormData = new FormData();
    filesFormData.append('filejson', JSON.stringify(body));

    let response;
    for (let i = 0; i <= 3; i++) {
        console.log(i);
        response = await fetch(env.SORTAI_API_URL as string + "uploadfilev2/", {
            headers: {
                'access_token': env.SORTAI_API_KEY as string,
            },
            method: 'POST',
            body: filesFormData,
        });

        if (response.ok) {
            break;
        }
    }
    if (!response?.ok) {
        throw new Error(`Failed to upload file to SortAI API. Status code: 500`);
    }


    const reponstext = await response.json();
    console.log("reponstext:", reponstext);

    await (await clerkClient()).users.updateUser(userId, {
        unsafeMetadata: {
            ...user?.unsafeMetadata,
            lastsort: new Date()
        }
    });;

    return NextResponse.json(reponstext, { status: 200 });


}